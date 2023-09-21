"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const controllers_1 = require("../controllers");
const auth_1 = __importDefault(require("../middlewares/auth"));
const admin_1 = __importDefault(require("../middlewares/admin"));
// api user interface
router.get('/user', controllers_1.userController.index);
router.get('/me', auth_1.default, controllers_1.userController.me);
router.delete('/user/:id', [auth_1.default, admin_1.default], controllers_1.userController.delete);
// api refresh token interface
router.post('/refresh', controllers_1.refreshController.refresh);
// api register interface
router.post('/register', controllers_1.registerController.register);
// api products interface
router.post('/products', [auth_1.default, admin_1.default], controllers_1.productController.store);
router.put('/products/:id', [auth_1.default, admin_1.default], controllers_1.productController.update);
router.delete('/products/:id', [auth_1.default, admin_1.default], controllers_1.productController.delete);
router.get('/products', controllers_1.productController.index);
router.get('/products/:id', controllers_1.productController.show);
// router.post('/login', loginController.login);
// router.post('/logout', auth, loginController.logout);
exports.default = router;
