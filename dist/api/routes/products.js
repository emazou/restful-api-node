"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
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
    }
    else {
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
exports.default = router;
