import express from 'express';

const router = express.Router();

router.get('/', (_req, res, _next) => {
    res.status(200).json({
        message: 'Orders were fetched'
    });
});

router.post('/', (req, res, _next) => {
    const order = {
        id: req.body.id,
        quantity: req.body.quantity
    };

    res.status(201).json({
        message: 'Order was created',
        data: order
    });
});

router.get('/:id', (req, res, _next) => {
    const { id } = req.params;
    res.status(200).json({
        message: 'Order details',
        id: id
    });
});

router.delete('/:id', (req, res, _next) => {
    const { id } = req.params;
    res.status(200).json({
        message: 'Order deleted',
        id: id
    });
});

export default router;