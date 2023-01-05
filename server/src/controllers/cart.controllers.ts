import { newCart, getCart } from "../services/cart.services";
import { Request, Response } from "express";

const newCartController = async (req: Request, res: Response) => {
  const { locals: { user } } = res;
  const { products } = req.body;

  const addedCart = await newCart(user.id, products);

  res.status(201).json(addedCart);
};

const getCartController = async (req: Request, res: Response) => {
  const { locals: { user } } = res;
  const cart = await getCart(user.id);

  res.status(200).json(cart);
};

export { newCartController, getCartController };