import User from "../DB/Models/user.model.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const JWT_SECRET="your_jwt_secret";


export const authenticateToken = async (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findByPk(decoded.id);
        if (!user) {
            throw new Error();
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Please authenticate.' });
    }
};