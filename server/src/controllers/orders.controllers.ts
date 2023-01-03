import { newOrder, getOrders } from "../services/orders.services";
import { Request, Response } from "express";

const newOrderController = async (req: Request, res: Response) => {
  const { locals: { user } } = res;
  const { products } = req.body;

  const addedOrder = await newOrder(user.id, products);

  res.status(201).json(addedOrder);
};

const getOrdersController = async (req: Request, res: Response) => {
  const { locals: { user } } = res;
  const orders = await getOrders(user.id);

  res.status(200).json(orders);
};

export { newOrderController, getOrdersController };