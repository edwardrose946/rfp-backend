import axios from "axios";


export const getSourcedPropertiesWrapper = () => {

    const list = 'repossessed-properties';
    const postcode = 'NW67YD';
    const radius = '20';
    const results = '10';

    return getSourcedProperties(list, postcode, radius, results);
};

export const getSourcedProperties = async (list: string, postcode: string, radius: string, results: string): Promise<Response> => {

    const PROPERTYDATA_API_KEY = process.env.PROPERTYDATA_API_KEY;
    const url = `https://api.propertydata.co.uk/sourced-properties?key=${PROPERTYDATA_API_KEY}&list=${list}&postcode=${postcode}&radius=${radius}&results=${results}`;

    return await axios.get(url);
};

// business logic, use the properties service to get a list of addresses, then use another free api to get more
// info and use that to filter the list down, which is given to the directions service.
// wrap all services in wrappers or testing