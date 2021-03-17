import { config } from 'dotenv';

config();

let MONGODB_URI = process.env.MONGODB_URI;
const SECRET_JWT = process.env.JWT_SECRET;

if (process.env.NODE_ENV === 'test') {
    MONGODB_URI= process.env.TEST_MONGODB_URI;
}

export default {
    MONGODB_URI,
    SECRET_JWT,
};