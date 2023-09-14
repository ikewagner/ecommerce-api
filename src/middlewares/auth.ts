import { Request, Response, NextFunction } from 'express';
import CustomErrorHandler from '../services/CustomErrorHandler';
import JwtService from '../services/JwtService';

// Extend the default Request object to include the user property
interface AuthenticatedRequest extends Request {
    user?: {
        _id: string;
        role: string;
    };
}

interface JwtPayload {
    _id: string;
    role: string;
}

const auth = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authHeader: string | undefined = req.headers.authorization;
    if (!authHeader) {
        return next(CustomErrorHandler.unAuthorized());
    }

    const token: string = authHeader.split(' ')[1];

    try {
        const { _id, role } = await JwtService.verify(token) as JwtPayload;
        const user = {
            _id,
            role
        }
        req.user = user;
        next();
    } catch(err) {
        return next(CustomErrorHandler.unAuthorized());
    }
}

export default auth;
