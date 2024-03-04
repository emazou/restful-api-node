import exp from 'constants';
import express from 'express';

const router = express.Router();

router.get('/', (_req, res, _next) => {
    res.status(200).json({
        message: 'Handling GET requests to /products'
    });
});

router.post('/', (_req, res, _next) => {
        res.status(201).json({
            message: 'Handling POST requests to /products'
        });
});

router.get('/:id', (req, res, _next) => {
    const { id } = req.params;
    if (id === 'special') {
        res.status(200).json({
            message: 'You discovered the special ID',
            id: id
        });
    } else {
        res.status(200).json({
            message: 'You passed an ID'
        });
    }
});

router.patch('/:id', (req, res, _next) => {
    const { id } = req.params;
    res.status(200).json({
        message: 'Updated product!',
        id: id
    });
});

router.delete('/:id', (req, res, _next) => {
    const { id } = req.params;
    res.status(200).json({
        message: 'Deleted product!',
        id: id
    });
});

export default router;