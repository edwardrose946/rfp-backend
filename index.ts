/* eslint-disable no-console */
import mongoose, { Error } from 'mongoose';
import { apolloServer } from './server';
import config from './utils/config';
import cors from 'cors';
import express from 'express';
import { parseAsString } from './utils/type-guards';


export const MONGODB_URI = parseAsString(config.MONGODB_URI);
export const SECRET_JWT = parseAsString(config.SECRET_JWT);
export const GOOGLE_MAPS_API_KEY = parseAsString(config.GOOGLE_MAPS_API_KEY);
export const PROPERTY_DATA_API_KEY = parseAsString(config.PROPERTY_DATA_API_KEY);
export const EPC_API_KEY = parseAsString(config.EPC_API_KEY);



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
