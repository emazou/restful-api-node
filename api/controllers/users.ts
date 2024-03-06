import { User } from '../models/user';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const users_login = (req: any, res: any, _next: any) => {
    User.findOne({ username: req.body.username })
    .then((user) => {
        if (!user) {
            return res.status(404).json({
                message: 'Auth failed'
            });
        }
        bcrypt.compare(req.body.password, user.password, (err, result) => {
            if (err) {
                return res.status(401).json({
                    message: 'Auth failed'
                });
            }
            if (result) {
                const token = jwt.sign({
                    username: user.username,
                    userId: user._id
                }, process.env.JWT_KEY as string, {
                    expiresIn: '1h'
                });
                return res.status(200).json({
                    message: 'Auth successful',
                    token
                });
            }
            res.status(401).json({
                message: 'Auth failed'
            });
        });
    })
    .catch((err) => {
        res.status(500).json({
            error: err
        });
    });
}

export const users_signup = (req: any, res: any, next: any) => {
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
}

export const users_delete_user = (req: any, res: any, _next: any) => {
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
}