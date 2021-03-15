import mongoose from "mongoose";
import config from "./utils/config";
import {parseAsString} from "./typeGuards";
import cors from "cors";
import express from 'express';
import {apolloServer} from "./server";



const MONGODB_URI = config.MONGODB_URI;
const PARSED_MONGODB_URI = parseAsString(MONGODB_URI);
export const SECRET_JWT = parseAsString(config.SECRET_JWT);


mongoose.connect(PARSED_MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true

})
    .then(() => {
        console.log('connected to MongoDB');
    })
    .catch((error) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        console.error('error connecting', error.message);

    });


const app = express();

apolloServer.applyMiddleware({app});

app.use(cors());

app.listen({port: 4000}, () => {
    console.log('server ready at http://localhost:4000/graphql');
});
