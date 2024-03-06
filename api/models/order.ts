import mongoose from 'mongoose';
import { IOrder } from '../interfaces';
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, default: 1 }
});

export const Order = mongoose.model<IOrder>('Order', orderSchema);