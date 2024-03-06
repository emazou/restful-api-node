import mongoose from 'mongoose';
import { IProduct } from '../interfaces';
const Schema = mongoose.Schema;

const productSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    price: { type: Number, required: true },
    productImage: { type: String, required: true }
});

export const Product = mongoose.model<IProduct>('Product', productSchema);