import jwt from 'jsonwebtoken'
// import { errorHandler } from './error.js';
import User from '../models/user.model.js';

export const verifyHost =async (req,res,next)=>{
    try {
        const token = req.cookies.access_token;

        if (!token) {
            return res.status(401).json({ error: 'Access denied' });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findOne({ _id: decodedToken.id, role: 'HOST' });

        if (!user) {
            return res.status(403).json({ error: 'Access denied. Unauthorized user' });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Access denied. Invalid token' });
    }
}
export const verifyGuest =async (req,res,next)=>{
    try {
        const token = req.cookies.access_token;

        if (!token) {
            return res.status(401).json({ error: 'Access denied' });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findOne({ _id: decodedToken.id, role: 'GUEST' });

        if (!user) {
            return res.status(403).json({ error: 'Access denied. Unauthorized user' });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Access denied. Invalid token' });
    }
}