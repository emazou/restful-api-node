import express from 'express';
import {
    users_login,
    users_delete_user,
    users_signup,
} from '../controllers/users';
import checkAuth from '../middleware/check-auth';

const router = express.Router();

router.post('/login', users_login);

router.post('/signup', users_signup);

router.delete('/:id',checkAuth, users_delete_user);

export default router;