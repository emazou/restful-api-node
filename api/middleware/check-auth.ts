import jwt from 'jsonwebtoken';

const middleware = (req: any, res: any, next: any) => {
    const token = req.headers.authorization?.split(' ')[1]; 
    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY as string);
        req.userData = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
}

export default middleware;