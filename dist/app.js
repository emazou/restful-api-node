"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const app = express();
const products_1 = __importDefault(require("./api/routes/products"));
app.use('/products', products_1.default);
module.exports = app;
