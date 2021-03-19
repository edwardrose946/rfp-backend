import axios, { AxiosResponse } from 'axios';
import { PROPERTY_DATA_API_KEY } from '../index';
import { PropertyData } from '../utils/types-and-interfaces';

export const getSourcedProperties = async (
    list: string, postcode: string, radius: string, results: string): Promise<AxiosResponse> => {
    const url =
        `https://api.propertydata.co.uk/sourced-properties?key=${PROPERTY_DATA_API_KEY}&list=${list}&postcode=${postcode}&radius=${radius}&results=${results}`;

    return await axios.get<PropertyData>(url);
};
