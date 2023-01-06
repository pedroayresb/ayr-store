import { newCart, getCart, deleteProductFromCart } from "../services/cart.services";
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

const deleteProductFromCartController = async (req: Request, res: Response) => {
  const { locals: { user } } = res;
  const { products } = req.body;

  await deleteProductFromCart(user.id, products);

  res.status(200).json(null);
};

export { newCartController, getCartController, deleteProductFromCartController };