// controllers/cartController.ts
import { Request, Response, NextFunction } from "express";
import CustomErrorHandler from "../services/CustomErrorHandler";
import CartItem from "../models/cart";
import User from '../models/user';


const cartController = {
  async addToCart(req: Request, res: Response, next: NextFunction) {
    const { _id } = req.params;

    const document = await User.findOne({ _id }).select("-updatedAt -__v");
     // Você precisa saber qual usuário está adicionando ao carrinho
    const productId = req.params.productId;

    try {
      // Verifique se o produto já está no carrinho do usuário
      let cartItem = await CartItem.findOne({
        product: productId,
        user: document,
      });

      if (cartItem) {
        // Se o produto já estiver no carrinho, aumente a quantidade
        cartItem.quantity += 1;
      } else {
        // Caso contrário, crie um novo item no carrinho
        cartItem = new CartItem({
          product: productId,
          user: document,
        });
      }

      // Salve o item do carrinho atualizado
      await cartItem.save();

      res.status(200).json({ message: "Produto adicionado ao carrinho com sucesso" });
    } catch (err) {
      return next(CustomErrorHandler.serverError());
    }
  },

  async listCartItems(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params._id;

      // Encontre todos os itens no carrinho para o usuário com o ID especificado
      const cartItems = await CartItem.find({ user: userId }).populate('product', 'name price');

      res.status(200).json({ cartItems });
    } catch (err) {
      return next(CustomErrorHandler.serverError());
    }
  },
  async removeCartItem(req: Request, res: Response, next: NextFunction) {
    try {
      const { _id } = req.params;
      const productId = req.params.productId;

      // Encontre e remova o item do carrinho com o produto especificado
      const result = await CartItem.findOneAndRemove({
        user: _id,
        product: productId,
      });

      if (result) {
        res.status(200).json({ message: "Item removido do carrinho com sucesso" });
      } else {
        res.status(404).json({ message: "Item não encontrado no carrinho" });
      }
    } catch (err) {
      return next(CustomErrorHandler.serverError());
    }
  },

  
  // Implemente outras funções do carrinho, como listar itens, remover itens, etc.
};

export default cartController;