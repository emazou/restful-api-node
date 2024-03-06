import express from 'express';
import { User } from '../models/user';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const router = express.Router();

router.post('/signup', (req, res, next) => {
    User.find({ username: req.body.username })
    .exec()
    .then((user) => {
        if (user.length >= 1) {
            return res.status(409).json({
                message: 'Username already exists'
            });
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        error: err
                    }); 
                } else {
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        username: req.body.username,
                        password: hash
                    });
                    user
                    .save()
                    .then((result) => {
                        res.status(201).json({
                            message: 'User created',
                            user: result
                        });
                    })
                    .catch((err) => {
                        res.status(500).json({
                            error: err
                        });
                    });
                }
            });
        }
    })
});

router.delete('/:id', (req, res, _next) => {
    const { id } = req.params;
    User.deleteOne({ _id: id })
    .exec()
    .then(() => {
        res.status(204).json({
            message: 'User deleted'
        });
    })
    .catch((err) => {
        res.status(500).json({
            error: err
        });
    });
});

export default router;