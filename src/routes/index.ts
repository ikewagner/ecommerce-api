import express from 'express';
const router = express.Router();
import { userController } from '../controllers';

router.get('/user', userController.index );

export default router;