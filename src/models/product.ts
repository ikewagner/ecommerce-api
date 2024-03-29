import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    size: { type: String, default: 0},
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    category: { type: String, required: true},
    stock: { type: Number, required: true, default: 0},
    image: { type: String, required: true, },
    slug: { type: String, required: true , unique: true },

}, { timestamps: true, toJSON: { getters: true }, id: false });



export default mongoose.model('Product', productSchema, 'products');