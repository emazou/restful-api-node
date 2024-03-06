import mongoose from "mongoose";
const Schema = mongoose.Schema;
import { IUser } from "../interfaces";

const userSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

export const User = mongoose.model<IUser>('User', userSchema);