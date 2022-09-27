import jwt from 'jsonwebtoken';
import User from '../models/userModel';

const authen = async (req, res, next) => {
    try {
        let token;

        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
        ) {
            try {
                token = req.headers.authorization.split(' ')[1];
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                const user = await User.findById(decoded.id).select('-password');
                req.user = user;
                next()
            } catch (err) {
                res.status(400)
                throw new Error('Not authorized');
            }
        }

        if (!token) {
            res.status(400)
            throw new Error('Not authorized, no token');
        }
    } catch (error) {
        res.json({ error: error.message })
    }
};

export default authen;
