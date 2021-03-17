import { Client, DirectionsResponse } from '@googlemaps/google-maps-services-js';
import { parseAsString } from '../utils/type-guards';

const client = new Client({});

const getDirectionsResponse = async (addresses: string[]): Promise<DirectionsResponse> => {

    const waypoints = ['optimize: true'].concat(addresses);

    return await client.directions({
        params: {
            destination: 'Bank House WA6 0PT',
            key: parseAsString(process.env.GOOGLE_MAPS_API_KEY),
            origin: 'Bank House WA6 0PT',
            waypoints: waypoints

        },
        timeout: 1000
    });
};

export default getDirectionsResponse;