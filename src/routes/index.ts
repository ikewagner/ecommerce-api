import express from 'express';
const router = express.Router();
import { userController, registerController, productController } from '../controllers';

// api user interface
router.get('/user', userController.index);
router.delete('/user/:id', userController.delete);


// api register interface
router.post('/register', registerController.register);

// api products interface

router.post('/products', productController.store);
router.put('/products/:id',  productController.update);
router.delete('/products/:id',  productController.delete);
router.get('/products', productController.index);
router.get('/products/:id', productController.show);

export default router;