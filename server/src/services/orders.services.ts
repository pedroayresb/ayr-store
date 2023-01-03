import Orders from "../models/Orders";
import { ProductsInterface } from "../interfaces/orders.interfaces";

const newOrder = async (userId: string, products: ProductsInterface[]) => {
  const order = new Orders(userId, products);
  const addedOrder = await order.save();

  return addedOrder;
};

const getOrders = async (userId: string) => {
  const order = new Orders(userId, []);

  const orders = await order.getFromUser(userId);

  return orders;
}

export { newOrder, getOrders };