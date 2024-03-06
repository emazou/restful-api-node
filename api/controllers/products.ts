import { Product } from '../models/product';
import mongoose from 'mongoose';

export const products_get_all = (_req: any, res: any, _next: any) => {
    Product.find()
    .select('name price _id productImage')
    .exec()
    .then((docs) => {
        const response = {
            count: docs.length,
            products: docs.map((doc) => {
                return {
                    name: doc.name,
                    price: doc.price,
                    productImage: doc.productImage,
                    _id: doc._id,
                    request: {
                        type: 'GET',
                        url: `http://localhost:3000/products/${doc._id}`
                    }
                };
            })
        };
        res.status(200).json(response);
    })
    .catch((err: any) => {
        res.status(500).json({
            error: err
        });
    });
}

export const products_create_product = (req: any, res: any, next: any) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        productImage: req.file?.path
    });
    product
    .save()
    .then((result) => {
        res.status(201).json({
            message: 'Created product successfully',
            product: result
        });
    })
    .catch((err) => {
        res.status(500).json({
            error: err
        });
    });
}

export const products_get_product = (req: any, res: any, _next: any) => {
    const { id } = req.params;
    Product.findById(id)
    .select('name price _id productImage')
    .exec()
    .then((doc) => {
        if (doc) {
            const response = {
                product: doc,
                request: {
                    type: 'GET',
                    description: 'Get all products',
                    url: 'http://localhost:3000/products'
                }
            };
            res.status(200).json(response);
        } else {
            res.status(404).json({ message: 'No valid entry found for provided ID' });
        }
    })
}

export const products_update_product = (req: any, res: any, _next: any) => {
    const { id } = req.params;
    Product.updateOne({ _id: id }, { $set: req.body })
    .exec()
    .then(() => {
        res.status(200).json({
            message: 'Product updated',
            request: {
                type: 'GET',
                url: `http://localhost:3000/products/${id}`
            }
        
        });
    })
    .catch((err) => {
        res.status(500).json({
            error: err
        });
    });
}

export const products_delete_product = (req: any, res: any, _next: any) => {
    const { id } = req.params;
    Product.findByIdAndDelete({ _id: id })
    .exec()
    .then((result) => {
        res.status(204).json(result);
    })
    .catch((err: any) => {
        res.status(500).json({
            error: err
        });
    });
}