import axios from "axios";
import { ProductsInterface } from "../interfaces/orders.interfaces";

export default {
  async login(username: string, password: string) {
    const { data } = await axios.post("http://localhost:5000/login", {
      username,
      password,
    });
    return data.token;
  },

  async register(name: string, email: string, password: string) {
    const { data } = await axios.post("http://localhost:5000/users", {
      name,
      email,
      password,
    });
    return data.token;
  },

  async getProfile(cookies: string) {
    const { data } = await axios.get("http://localhost:5000/users/get-user", {
      headers: { Authorization: cookies },
    });
    return data[0];
  },

  async getOrders(cookies: string) {
    const { data } = await axios.get("http://localhost:5000/orders", {
      headers: { Authorization: cookies },
    });
    return data;
  },

  async createOrder(products: ProductsInterface[], cookies: string) {
    const { data } = await axios.post(
      "http://localhost:5000/orders",
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
