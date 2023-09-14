import { Request, Response, NextFunction } from 'express';
import { User } from '../models';
import CustomErrorHandler from '../services/CustomErrorHandler';


// Extend the default Request object to include the user property
interface AuthenticatedRequest extends Request {
    user?: {
        _id: string;
        role: string;
    };
}

const admin = async (req: AuthenticatedRequest , res: Response, next: NextFunction) => {

    const authHeader: string | undefined = req.headers.authorization;
    
    if (!authHeader) {
        return next(CustomErrorHandler.unAuthorized());
    }

    try {
        const user = await User.findOne({ _id: req.user }).select('-password -updatedAt -__v');

        if (!user) {
            return next(CustomErrorHandler.unAuthorized("User not found"));
        }
        if (user.role === 'admin') {
            next();
        } else {
            return res.status(401).json({ message: 'Usuário sem acesso para cadastrar produtos' });
        }
    } catch (err) {
        return next(CustomErrorHandler.serverError());
    }
};

export default admin;
