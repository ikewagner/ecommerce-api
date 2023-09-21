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
const models_1 = require("../models");
const CustomErrorHandler_1 = __importDefault(require("../services/CustomErrorHandler"));
const productController = {
    store(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, desciption, price, size, discount, category, image } = req.body;
            let document;
            try {
                document = yield models_1.Product.create({
                    name,
                    desciption,
                    price,
                    size,
                    discount,
                    category,
                    image,
                });
            }
            catch (err) {
                return next(err);
            }
            res.status(201).json(document);
        });
    },
    delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const document = yield models_1.Product.findOneAndRemove({ _id: req.params.id });
            if (!document) {
                return next(new Error("Nada para excluir"));
            }
            return res.json(document);
        });
    },
    index(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let documents;
            // Pagination parameters from request query
            const page = typeof req.query.page === "string" ? parseInt(req.query.page) : 1;
            const limit = typeof req.query.limit === "string" ? parseInt(req.query.limit) : 5;
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const skip = (page - 1) * limit;
            try {
                documents = yield models_1.Product.find()
                    .select("-updatedAt -__v")
                    .sort({ _id: -1 })
                    .skip(skip)
                    .limit(limit);
            }
            catch (err) {
                return next(CustomErrorHandler_1.default.serverError());
            }
            return res.json(documents);
        });
    },
    show(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let document;
            try {
                document = yield models_1.Product.findOne({ _id: req.params.id }).select("-updatedAt -__v");
            }
            catch (err) {
                return next(CustomErrorHandler_1.default.serverError());
            }
            return res.json(document);
        });
    },
    update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, desciption, price, size, discount, category, image } = req.body;
            let document;
            try {
                document = yield models_1.Product.findOneAndUpdate({ _id: req.params.id }, {
                    name,
                    desciption,
                    price,
                    size,
                    discount,
                    category,
                    image,
                }, { new: true });
            }
            catch (err) {
                return next(err);
            }
            res.status(201).json(document);
        });
    },
};
exports.default = productController;
