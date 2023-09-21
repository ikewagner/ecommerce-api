"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshController = exports.productController = exports.registerController = exports.userController = void 0;
var userController_1 = require("./auth/userController");
Object.defineProperty(exports, "userController", { enumerable: true, get: function () { return __importDefault(userController_1).default; } });
var registerController_1 = require("./auth/registerController");
Object.defineProperty(exports, "registerController", { enumerable: true, get: function () { return __importDefault(registerController_1).default; } });
var productController_1 = require("./productController");
Object.defineProperty(exports, "productController", { enumerable: true, get: function () { return __importDefault(productController_1).default; } });
var refreshController_1 = require("./auth/refreshController");
Object.defineProperty(exports, "refreshController", { enumerable: true, get: function () { return __importDefault(refreshController_1).default; } });
