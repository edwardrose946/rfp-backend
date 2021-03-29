/* eslint-disable no-console */
import mongoose, { Error } from 'mongoose';
import { apolloServer } from './server';
import config from './utils/config';
import cors from 'cors';
import express from 'express';


export const MONGODB_URI = config.MONGODB_URI as string;
export const SECRET_JWT = config.SECRET_JWT as string;
export const GOOGLE_MAPS_API_KEY = config.GOOGLE_MAPS_API_KEY as string;
export const PROPERTY_DATA_API_KEY = config.PROPERTY_DATA_API_KEY as string;
export const EPC_API_KEY = config.EPC_API_KEY as string;
const PORT = config.PORT as string;


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

app.listen({ port: PORT }, () => {
    console.log(`server ready at http://localhost:${PORT}/graphql`);
});
