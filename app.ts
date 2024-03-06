import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import productRoutes from './api/routes/products';
import orderRoutes from './api/routes/orders';
import userRoutes from './api/routes/users';

const app = express();
app.use(express.json());

require('dotenv').config();
const mongoDBAtlasUri = process.env.MONGO_DB_ATLAS_URI as string;

mongoose.connect(mongoDBAtlasUri, {  })
  .then(() => console.log('Conexión a MongoDB Atlas exitosa'))
  .catch((err: any) => console.error('Error al conectar a MongoDB Atlas:', err));

app.use(morgan('dev'));
app.use(express.urlencoded({
    extended: false
    }));
app.use('/uploads', express.static('/uploads'));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/users', userRoutes);

class CustomError extends Error {
    status?: number;
}

app.use((_req, res, next) => {
    const error = new CustomError('Not found');
    error.status = 404;
    next(error);
});

app.use((error: CustomError, _req: any, res: any, _next: any) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

export default app;