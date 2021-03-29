import { config } from 'dotenv';
import { parseAsString } from './type-guards';

config();


let MONGODB_URI = process.env.MONGODB_URI;
const SECRET_JWT = process.env.JWT_SECRET;
const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
const PROPERTY_DATA_API_KEY = process.env.PROPERTYDATA_API_KEY;
const EPC_API_KEY = process.env.EPC_API_KEY;
const PORT = process.env.PORT;


if (process.env.NODE_ENV === 'test') {
    MONGODB_URI = parseAsString(process.env.TEST_MONGODB_URI);
}

export default {
    EPC_API_KEY,
    GOOGLE_MAPS_API_KEY,
    MONGODB_URI,
    PORT,
    PROPERTY_DATA_API_KEY,
    SECRET_JWT
};