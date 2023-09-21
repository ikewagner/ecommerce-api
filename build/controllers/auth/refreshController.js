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
const config_1 = require("../../config");
const models_1 = require("../../models");
const JwtService_1 = __importDefault(require("../../services/JwtService"));
const CustomErrorHandler_1 = __importDefault(require("../../services/CustomErrorHandler"));
const refreshController = {
    refresh(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // validation
            const refreshSchema = joi_1.default.object({
                refresh_token: joi_1.default.string().required(),
            });
            const { error } = refreshSchema.validate(req.body);
            if (error) {
                return next(error);
            }
            // database
            let refreshtoken;
            try {
                refreshtoken = yield models_1.RefreshToken.findOne({ token: req.body.refresh_token });
                if (!refreshtoken) {
                    return next(CustomErrorHandler_1.default.unAuthorized('Token de atualização inválido'));
                }
                let userId;
                try {
                    if (!refreshtoken || !refreshtoken.token) {
                        return next(CustomErrorHandler_1.default.unAuthorized("Token de atualização inválido"));
                    }
                    const payload = yield JwtService_1.default.verify(refreshtoken.token, config_1.REFRESH_SECRET);
                    userId = payload._id;
                }
                catch (err) {
                    return next(CustomErrorHandler_1.default.unAuthorized('Token de atualização inválido'));
                }
                const user = yield models_1.User.findOne({ _id: userId });
                if (!user) {
                    return next(CustomErrorHandler_1.default.unAuthorized('Nenhum usuário encontrado!'));
                }
                // tokens
                const access_token = JwtService_1.default.sign({ _id: user._id, role: user.role });
                const refresh_token = JwtService_1.default.sign({ _id: user._id, role: user.role }, '1y', config_1.REFRESH_SECRET);
                // database whitelist
                yield models_1.RefreshToken.create({ token: refresh_token });
                return res.json({ access_token, refresh_token });
            }
            catch (err) {
                return next(new Error('Algo deu errado ' + err));
            }
        });
    }
};
exports.default = refreshController;
