import express from 'express';

const router = express.Router();

router.get('/', (_req, res, _next) => {
    res.status(200).json({
        message: 'Orders were fetched'
    });
});

router.post('/', (_req, res, _next) => {
    res.status(201).json({
        message: 'Order was created'
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