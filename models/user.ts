import mongoose, {Document} from "mongoose";

export interface IUser extends Document {
    username: string;
    passwordHash: string;
}

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 5
    },
    passwordHash: {
        type: String,
        required: true,
        minlength: 5
    },
});

userSchema.set('toObject', {
    transform: (_document: Document, returnedObject: IUser) => {
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

export default mongoose.model<IUser>('User', userSchema);
