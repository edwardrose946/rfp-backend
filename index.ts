/* eslint-disable no-console */
import mongoose, { Error } from 'mongoose';
import { SecretManagerServiceClient } from '@google-cloud/secret-manager';
import { apolloServer } from './server';
import config from './utils/config';
import cors from 'cors';
import express from 'express';
import { parseAsString } from './utils/type-guards';

const client = new SecretManagerServiceClient();

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

export let MONGODB_URI = parseAsString(config.MONGODB_URI);
export let SECRET_JWT = parseAsString(config.SECRET_JWT);
export let GOOGLE_MAPS_API_KEY = parseAsString(config.GOOGLE_MAPS_API_KEY);
export let PROPERTY_DATA_API_KEY = parseAsString(config.PROPERTY_DATA_API_KEY);
export let EPC_API_KEY = parseAsString(config.EPC_API_KEY);

setSecrets()
    .then(()=> console.log('set'))
    .catch(err => console.error(err));

mongoose.connect(MONGODB_URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true

})
    .then(() => {
        console.log('connected to MongoDB');
    })
    .catch((error: Error) => {
        console.error('error connecting', error.message);
    });


const app = express();

apolloServer.applyMiddleware({ app });

app.use(cors());

app.listen({ port: 4000 }, () => {
    console.log('server ready at http://localhost:4000/graphql');
});
