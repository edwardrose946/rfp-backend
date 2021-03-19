import { Client, DirectionsResponse } from '@googlemaps/google-maps-services-js';
import { GOOGLE_MAPS_API_KEY } from '../index';

const client = new Client({});

const getDirectionsResponse = async (addresses: string[]): Promise<DirectionsResponse> => {

    const waypoints = ['optimize: true'].concat(addresses);

    return await client.directions({
        params: {
            destination: 'Bank House WA6 0PT',
            key: GOOGLE_MAPS_API_KEY,
            origin: 'Bank House WA6 0PT',
            waypoints: waypoints

        },
        timeout: 1000
    });
};

export default getDirectionsResponse;