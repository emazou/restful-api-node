import type { NextFunction, Request, Response } from "express";

const express = require('express');
const app = express();

import productRoutes from './api/routes/products';
import orderRoutes from './api/routes/orders';

app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

module.exports = app;