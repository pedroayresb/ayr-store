import axios from "axios";
import {
  ProductsInterface,
  CategoriesInterface,
} from "../interfaces/orders.interfaces";

export default {
  async login(username: string, password: string) {
    const { data } = await axios.post("http://localhost:5000/login", {
      username,
      password,
    });
    return data.token;
  },

  async register(username: string, email: string, password: string) {
    const { data } = await axios.post("http://localhost:5000/users", {
      username,
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

  // eu sei que essa funcao esta horrivel, mas a API do mercado livre nao facilita para conseguir todas as subcategorias //
  async getAllChildrenCategories(id: string) {
    const childs = await this.getCategories(id);
    childs.map(async (child: CategoriesInterface) => {
      const childs1 = await this.getCategories(child.id);
      if (childs1.length > 0) {
        childs1.map(async (child1: CategoriesInterface) => {
          const childs2 = await this.getCategories(child1.id);
          if (childs2.length > 0) {
            childs2.map(async (child2: CategoriesInterface) => {
              const childs3 = await this.getCategories(child2.id);
              if (childs3.length > 0) {
                childs3.map(async (child3: CategoriesInterface) => {
                  const childs4 = await this.getCategories(child3.id);
                  if (childs4.length > 0) {
                    child3.children_categories = childs4;
                  }
                });
                child2.children_categories = childs3;
              }
            });
            child1.children_categories = childs2;
          }
        });
        child.children_categories = childs1;
      }
    });
    return childs;
  },

  async getCart(cookies: string) {
    const { data } = await axios.get("http://localhost:5000/cart", {
      headers: { Authorization: cookies },
    });
    return data;
  },

  async addToCart(cookies: string, product: string[]) {
    const { data } = await axios.post(
      "http://localhost:5000/cart",
      {
        products: product,
      },
      {
        headers: { Authorization: cookies },
      }
    );
    return data;
  },
};
