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
const joi_1 = __importDefault(require("joi"));
const models_1 = require("../../models");
const bcrypt_1 = __importDefault(require("bcrypt"));
const JwtService_1 = __importDefault(require("../../services/JwtService"));
const config_1 = require("../../config");
const CustomErrorHandler_1 = __importDefault(require("../../services/CustomErrorHandler"));
const registerController = {
    register(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // Validation
            const registerSchema = joi_1.default.object({
                name: joi_1.default.string().min(3).max(30).required(),
                email: joi_1.default.string().email().required(),
                password: joi_1.default.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
                repeat_password: joi_1.default.ref('password'),
                role: joi_1.default.string(),
            });
            const { error } = registerSchema.validate(req.body);
            if (error) {
                return next(error);
            }
            // check if user is in the database already
            try {
                const exist = yield models_1.User.exists({ email: req.body.email });
                if (exist) {
                    return next(CustomErrorHandler_1.default.alreadyExist());
                }
            }
            catch (err) {
                return next(err);
            }
            const { name, email, password, role } = req.body;
            // Hash password
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            // prepare the model
            const user = new models_1.User({
                name,
                email,
                password: hashedPassword,
                role,
            });
            let access_token;
            let refresh_token;
            try {
                const result = yield user.save();
                console.log(result);
                // Token
                access_token = JwtService_1.default.sign({ _id: result._id, role: result.role });
                refresh_token = JwtService_1.default.sign({ _id: result._id, role: result.role }, '1y', config_1.REFRESH_SECRET);
                // database whitelist
                yield models_1.RefreshToken.create({ token: refresh_token });
            }
            catch (err) {
                return next(err);
            }
            res.json({ access_token, refresh_token });
        });
    },
};
exports.default = registerController;
