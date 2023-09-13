import express from 'express';
const router = express.Router();
import { userController, registerController } from '../controllers';

// api user interface
router.get('/user', userController.index);
router.delete('/user/:id', userController.delete);



// api register interface
router.post('/register', registerController.register);



export default router;