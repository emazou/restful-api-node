import express from 'express';
import { Product } from '../models/product';
import mongoose from 'mongoose';
import multer from 'multer';

const router = express.Router();
const storage = multer.diskStorage({
    destination: function (_req: any, _file:any, cb: any) {
        cb(null, '/uploads/');
    },
    filename: function (_req: any, file: any, cb: any) {
        const newFilename = new Date().toISOString().replace(/:/g, '-') + file.originalname;
        cb(null, newFilename);
    }
});

const fileFilter = (_req: any, file: any, cb: any) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new Error('File type not supported'), false);
    }
}

const upload = multer({ storage: storage,
    limits: {fileSize: 1024 * 1024 * 5,},
    fileFilter
});

router.get('/', (_req, res, _next) => {
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
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.post("/", upload.single('productImage'),(req, res, next) => {
    console.log(req.file);
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
        console.log(err)
        res.status(500).json({
            error: err
        });
    });
});

router.get('/:id', (req, res, _next) => {
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
});

router.patch('/:id', (req, res, _next) => {
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
    .then((result) => {
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