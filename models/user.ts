/* eslint-disable sort-keys */
import mongoose, { Document, ObjectId } from 'mongoose';

export interface IMongooseUser extends Document {
    username: string;
    passwordHash: string;
    _id?: ObjectId
}

const userSchema = new mongoose.Schema({
    passwordHash: {
        type: String,
        required: true,
        minlength: 5
    },
    username: {
        type: String,
        required: true,
        minlength: 5,
        unique: true
    },
});

userSchema.set('toObject', {
    transform: (_document: Document, returnedObject: IMongooseUser) => {
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

export default mongoose.model<IMongooseUser>('User', userSchema);
