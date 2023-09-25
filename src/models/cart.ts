import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const cartItemSchema  = new Schema({
    product: {
    type: mongoose.Types.ObjectId,
    ref: "Product", // Referência ao modelo de produto existente
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1, // Quantidade padrão quando um produto é adicionado ao carrinho
  },
}, { timestamps: true, toJSON: { getters: true }, id: false })

export default mongoose.model('CartItem', cartItemSchema, 'cartItem');
