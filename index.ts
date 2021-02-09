import {apolloServer} from "./app";
import mongoose from "mongoose";
import config from "./utils/config";
import {parseAsString} from "./tsUtils";


const MONGODB_URI = config.MONGODB_URI;
const PARSED_MONGODB_URI = parseAsString(MONGODB_URI);

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

void apolloServer.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`);
});