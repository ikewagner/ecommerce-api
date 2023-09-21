import { Product } from "../models";
import CustomErrorHandler from "../services/CustomErrorHandler";
import { Request, Response, NextFunction } from "express";

const productController = {
  async store(req: Request, res: Response, next: NextFunction) {
    const { name, desciption, price, size, discount, category, image } =
      req.body;
    let document;
    try {
      document = await Product.create({
        name,
        desciption,
        price,
        size,
        discount,
        category,
        image,
      });
    } catch (err) {
      return next(err);
    }
    res.status(201).json(document);
  },
  async delete(req: Request, res: Response, next: NextFunction) {
    const document = await Product.findOneAndRemove({ _id: req.params.id });
    if (!document) {
      return next(new Error("Nada para excluir"));
    }
    return res.json(document);
  },
  async index(req: Request, res: Response, next: NextFunction) {
    let documents;
    // Pagination parameters from request query
    const page =
      typeof req.query.page === "string" ? parseInt(req.query.page) : 1;
    const limit =
      typeof req.query.limit === "string" ? parseInt(req.query.limit) : 5;
      const category = req.query.category as string; // Add this line to get the category query parameter
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const skip = (page - 1) * limit;
    
      const query: { category?: string } = {};
    
      if (category) {
        query['category'] = category; // Add category to query if it exists
      }

    try {
      documents = await Product.find(query)
        .select("-updatedAt -__v")
        .sort({ _id: -1 })
        .skip(skip)
        .limit(limit);
    } catch (err) {
      return next(CustomErrorHandler.serverError());
    }
    return res.json(documents);
  },
  async show(req: Request, res: Response, next: NextFunction) {
    let document;
    try {
      document = await Product.findOne({ _id: req.params.id }).select(
        "-updatedAt -__v"
      );
    } catch (err) {
      return next(CustomErrorHandler.serverError());
    }
    return res.json(document);
  },
  async update(req: Request, res: Response, next: NextFunction) {
    const { name, desciption, price, size, discount, category, image } =
      req.body;
    let document;
    try {
      document = await Product.findOneAndUpdate(
        { _id: req.params.id },
        {
          name,
          desciption,
          price,
          size,
          discount,
          category,
          image,
        },
        { new: true }
      );
    } catch (err) {
      return next(err);
    }
    res.status(201).json(document);
  },
};

export default productController;
