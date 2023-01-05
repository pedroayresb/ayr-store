import Cart from "../models/Cart";
import { ProductsInterface, OrdersInterface } from "../interfaces/orders.interfaces";


const getCart = async (userId: string) => {
  const order = new Cart(userId, []);
  
  const carts = await order.getFromUser(userId);
  
  return carts;
}

const newCart = async (userId: string, products: ProductsInterface[]) => {
  const order = new Cart(userId, products);
  const userCart = await order.getFromUser(userId) as unknown as OrdersInterface[];
  const hasItem = userCart.find((item) => item.productId === products[0].id);
  if (hasItem) {
    const updatedOrder = await order.update();
    return updatedOrder;
  }
  const addedOrder = await order.save();

  return addedOrder;
};

export { newCart, getCart };