import { Product } from "../models";
import CustomErrorHandler from "../services/CustomErrorHandler";
import { Request, Response, NextFunction } from "express";
import slugify from "slugify";

const productController = {
  async store(req: Request, res: Response, next: NextFunction) {
    const { name, description, price, size, discount, category, image } =
      req.body;
    let document;

    // Criar o slug a partir do nome do produto
    const slug = slugify(name, { lower: true });

    try {
      document = await Product.create({
        name,
        description,
        price,
        size,
        discount,
        category,
        image,
        slug,
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
      query["category"] = category; // Add category to query if it exists
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

    const { slug } = req.params; // Capturar o slug dos parâmetros da URL

    try {
      document = await Product.findOne({ slug }).select("-updatedAt -__v");
    } catch (err) {
      return next(CustomErrorHandler.serverError());
    }
    return res.json(document);
  },
  async update(req: Request, res: Response, next: NextFunction) {
    const { name, desciption, price, size, discount, category, image, slug } =
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
          slug,
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
