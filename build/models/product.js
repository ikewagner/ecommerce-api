"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const productSchema = new Schema({
    name: { type: String, required: true },
    desciption: { type: String, required: true },
    size: { type: String, default: 0 },
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    category: { type: String, required: true },
    image: { type: String, required: true, }
}, { timestamps: true, toJSON: { getters: true }, id: false });
exports.default = mongoose_1.default.model('Product', productSchema, 'products');
