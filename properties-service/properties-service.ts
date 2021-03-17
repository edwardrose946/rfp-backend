import axios, { AxiosResponse } from 'axios';
import { PropertyData } from '../utils/types-and-interfaces';
import { parseAsString } from '../utils/type-guards';

export const getSourcedProperties = async (
    list: string, postcode: string, radius: string, results: string): Promise<AxiosResponse> => {

    const PROPERTY_DATA_API_KEY = parseAsString(process.env.PROPERTYDATA_API_KEY);
    const url =
        `https://api.propertydata.co.uk/sourced-properties?key=${PROPERTY_DATA_API_KEY}&list=${list}&postcode=${postcode}&radius=${radius}&results=${results}`;

    return await axios.get<PropertyData>(url);
};
