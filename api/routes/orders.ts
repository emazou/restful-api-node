import express from 'express';
import { Order } from '../models/order';
import { Product } from '../models/product';
import mongoose from 'mongoose';

const router = express.Router();

router.get('/', (req, res, _next) => {
    Order.find()
    .select('product quantity _id')
    .populate('product')
    .exec()
    .then((docs) => {
        res.status(200).json({
            count: docs.length,
            orders: docs.map((doc) => {
                return {
                    _id: doc._id,
                    product: doc.product,
                    quantity: doc.quantity,
                    request: {
                        type: 'GET',
                        url: `http://localhost:3000/orders/${doc._id}`
                    }
                };
            })
        });
    })
    .catch((err: any) => {
        res.status(500).json({
            error: err
        });
    });
});

router.post('/', (req, res, _next) => {
    Product.findById(req.body.productId)
    .then((product) => {
        if (!product) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }
        const order = new Order({
            _id: new mongoose.Types.ObjectId(),
            quantity: req.body.quantity,
            product: product._id
        });
        return order.save() as any;
        })
        .then((result: any) => {
            return res.status(201).json({
                message: 'Order was created',
                createdOrder: {
                    _id: result?._id,
                    product: result?.product,
                    quantity: result?.quantity
                },
                request: {
                    type: 'GET',
                    url: `http://localhost:3000/orders/${result._id}`
                }
            });
        })
        .catch((err: any) => {
            res.status(500).json({
                error: err
            });
        }); 
});

router.get('/:id', (req, res, _next) => {
    const { id } = req.params;
    Order.findById(id)
    .select('product quantity _id')
    .exec()
    .then((doc) => {
        if (doc) {
            res.status(200).json({
                order: doc,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/orders'
                }
            });
        } else {
            res.status(404).json({
                message: 'No valid entry found for provided ID'
            });
        }
    })
    .catch((err: any) => {
        res.status(500).json({
            error: err
        });
    });
});

router.delete('/:id', (req, res, _next) => {
    const { id } = req.params;
    Order.deleteOne({ _id: id })
    .exec()
    .then((order) => {
        if (!order) {
            return res.status(404).json({
                message: 'Order not found'
            });
        }
        res.status(204).json({
            message: 'Order was deleted'
        });
    })
    .catch((err: any) => {
        res.status(500).json({
            error: err
        });
    });

});

export default router;