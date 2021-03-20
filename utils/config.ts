import { SecretManagerServiceClient } from '@google-cloud/secret-manager';
import { config } from 'dotenv';

config();

const client = new SecretManagerServiceClient();

let MONGODB_URI = process.env.MONGODB_URI;
let SECRET_JWT = process.env.JWT_SECRET;
let GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
let PROPERTY_DATA_API_KEY = process.env.PROPERTYDATA_API_KEY;
let EPC_API_KEY = process.env.EPC_API_KEY;

async function getSecret(name: string): Promise<string> {

    const [accessResponse] = await client.accessSecretVersion({
        name: name
    });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return accessResponse.payload.data.toString('utf8');
}

async function setSecrets() {
    EPC_API_KEY = await getSecret('projects/326578430699/secrets/EPC_API_KEY/versions/1');
    SECRET_JWT = await getSecret('projects/326578430699/secrets/JWT_SECRET/versions/1');
    GOOGLE_MAPS_API_KEY = await getSecret('projects/326578430699/secrets/GOOGLE_MAPS_API_KEY/versions/1');
    MONGODB_URI = await getSecret('projects/326578430699/secrets/MONGODB_URI/versions/1');
    PROPERTY_DATA_API_KEY = await getSecret('projects/326578430699/secrets/PROPERTYDATA_API_KEY/versions/1');
}

if (process.env.NODE_ENV === 'test') {
    MONGODB_URI = process.env.TEST_MONGODB_URI;
} else {
    setSecrets()
        // eslint-disable-next-line no-console
        .catch(err => console.error(err));
}

export default {
    EPC_API_KEY,
    GOOGLE_MAPS_API_KEY,
    MONGODB_URI,
    PROPERTY_DATA_API_KEY,
    SECRET_JWT,
};