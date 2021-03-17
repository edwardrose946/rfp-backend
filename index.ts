/* eslint-disable no-console */
import mongoose, { Error } from 'mongoose';
import { apolloServer } from './server';
import config from './utils/config';
import cors from 'cors';
import express from 'express';
import { parseAsString } from './utils/type-guards';



const MONGODB_URI = config.MONGODB_URI;
const PARSED_MONGODB_URI = parseAsString(MONGODB_URI);
export const SECRET_JWT = parseAsString(config.SECRET_JWT);


mongoose.connect(PARSED_MONGODB_URI, {
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
