import {Client} from "@googlemaps/google-maps-services-js";
import {parseAsString} from "../typeGuards";

const client = new Client({});

const getDirectionsResponse = async (addresses: string[]) => {

    const waypoints = ["optimize: true"].concat(addresses);

    return await client.directions({
        params: {
            key: parseAsString(process.env.GOOGLE_MAPS_API_KEY),
            origin: "Bank House WA6 0PT",
            destination: "Bank House WA6 0PT",
            waypoints: waypoints

        },
        timeout: 1000
    });
};

export default getDirectionsResponse;