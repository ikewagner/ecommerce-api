import express from 'express';
const router = express.Router();
import { userController, registerController, productController, refreshController, cartController } from '../controllers';
import  auth  from '../middlewares/auth';
import admin from '../middlewares/admin';


// api user interface
router.get('/user', userController.index);
router.get('/me', auth, userController.me);
router.delete('/user/:id', [auth, admin], userController.delete);

// api refresh token interface
router.post('/refresh', refreshController.refresh);

// api register interface
router.post('/register', registerController.register);


router.post('/cart/add/:productId', auth, cartController.addToCart);
router.get('/cart', auth, cartController.listCartItems);

// api products interface

router.post('/products', [auth, admin], productController.store);
router.put('/products/:id', [auth, admin], productController.update);
router.delete('/products/:id', [auth, admin], productController.delete);
router.get('/products', productController.index);
router.get('/products/:slug', productController.show);





// router.post('/login', loginController.login);
// router.post('/logout', auth, loginController.logout);



export default router;