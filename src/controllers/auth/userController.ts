import { Request, Response } from 'express';
import User from '../../models/user';

const userController = {
    async index(req: Request, res: Response) {
        try {
            const users = await User.find().select('-updatedAt -__v').sort({ _id: -1 });
            return res.json(users);
        } catch(err) {
            console.error(err); // Log the error for debugging purposes
            return res.status(500).json({ message: 'Failed to fetch users' });
        }
    },
};

export default userController;
