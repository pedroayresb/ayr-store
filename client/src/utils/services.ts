import axios from "axios";
import { ProductsInterface } from "../interfaces/orders.interfaces";

export default {
  async login(email: string, password: string) {
    const { data } = await axios.post("/login", { email, password });
    return data;
  },

  async register(name: string, email: string, password: string) {
    const { data } = await axios.post("/users", { name, email, password });
    return data;
  },

  async getOrders(cookies: string) {
    const { data } = await axios.get("/orders", {
      headers: { Authorization: cookies },
    });
    return data;
  },

  async createOrder(products: ProductsInterface[], cookies: string) {
    const { data } = await axios.post(
      "/orders",
      {
        products,
      },
      {
        headers: { Authorization: cookies },
      }
    );
    return data;
  },

  async getCategories(category: string) {
    const { data } = await axios.get(
      `https://api.mercadolibre.com/categories/${category}`
    );
    return data.children_categories;
  },

  async getQuantity(category: string) {
    const { data } = await axios.get(
      `https://api.mercadolibre.com/categories/${category}`
    );
    return data.total_items_in_this_category;
  },

  async getProducts(category: string, page: number) {
    const offset = page * 50;
    const { data } = await axios.get(
      `https://api.mercadolibre.com/sites/MLB/search?category=${category}&offset=${offset}`
    );
    return data.results;
  },
};
