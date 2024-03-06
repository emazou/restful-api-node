import express from 'express';
import checkAuth from '../middleware/check-auth';
import { 
    orders_create_order, 
    orders_delete_order, 
    orders_get_all, 
    orders_get_order 
} from '../controllers/orders';

const router = express.Router();

router.get('/', checkAuth, orders_get_all);

router.post('/', checkAuth, orders_create_order);

router.get('/:id', checkAuth, orders_get_order );

router.delete('/:id', checkAuth, orders_delete_order);

export default router;