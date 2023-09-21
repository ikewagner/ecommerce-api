"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../../models/user"));
const CustomErrorHandler_1 = __importDefault(require("../../services/CustomErrorHandler"));
const userController = {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield user_1.default.find().select('-updatedAt -__v').sort({ _id: -1 });
                return res.json(users);
            }
            catch (err) {
                console.error(err); // Log the error for debugging purposes
                return res.status(500).json({ message: 'Failed to fetch users' });
            }
        });
    },
    delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const document = yield user_1.default.findOneAndRemove({ _id: req.params.id });
            if (!document) {
                return next(new Error('Nada para excluir'));
            }
            return res.json(document);
        });
    },
    me(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_1.default.findOne({ _id: req.user }).select('-password -updatedAt -__v');
                if (!user) {
                    return next(CustomErrorHandler_1.default.notFound());
                }
                res.json(user);
            }
            catch (err) {
                return next(err);
            }
        });
    }
};
exports.default = userController;
