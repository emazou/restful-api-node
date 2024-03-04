import express from 'express';
import { Product } from '../models/product';
import mongoose from 'mongoose';
import type { ProductType } from '../types';

const router = express.Router();

router.get('/', (_req, res, _next) => {
    Product.find()
    .exec()
    .then((docs: ProductType[]) => {
        console.log(docs);
        res.status(200).json(docs);
    })
    .catch((err: any) => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.post('/', (req, res, _next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    product
    .save()
    .then((result: ProductType) => {
        console.log(result);
        res.status(201).json({
            message: 'Handling POST requests to /products',
            data: result
        });
    })
    .catch((err: any) => {
        console.log(err)
        res.status(500).json({
            error: err
        });
    });
});

router.get('/:id', (req, res, _next) => {
    const { id } = req.params;
    Product.findById(id)
    .exec()
    .then((doc: ProductType) => {
        console.log('From database', doc);
        if (doc) {
            res.status(200).json(doc);
        } else {
            res.status(404).json({ message: 'No valid entry found for provided ID' });
        }
    })
});

router.patch('/:id', (req, res, _next) => {
    const { id } = req.params;
    Product.updateOne({ _id: id }, { $set: req.body })
    .exec()
    .then((result: any) => {
        res.status(200).json(result);
    })
    .catch((err: any) => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.delete('/:id', (req, res, _next) => {
    const { id } = req.params;
    Product.findByIdAndDelete({ _id: id })
    .exec()
    .then((result: ProductType) => {
        res.status(204).json(result);
    })
    .catch((err: any) => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

export default router;