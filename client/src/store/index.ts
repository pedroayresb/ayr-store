import { createStore } from "vuex";
import {
  CategoriesInterface,
  ProductsInterface,
  OrdersInterface,
} from "../interfaces/orders.interfaces";
import services from "../utils/services";

export default createStore({
  state: {
    categories: [] as CategoriesInterface[],
    page: 1,
    products: [] as ProductsInterface[],
    category: {
      id: "MLB1648",
      name: "Todos",
      total_items_in_this_category: 5710905,
    } as CategoriesInterface,
    pageLoading: true,
    user: {
      username: "",
      email: "",
      password: "",
      experience: 0,
    },
    cart: [] as OrdersInterface[],
    subtotal: 0,
    product: {} as ProductsInterface,
  },
  getters: {
    getCategories(state) {
      return state.categories;
    },
    getPage(state) {
      return state.page;
    },
    getProducts(state) {
      return state.products;
    },
    getCategory(state) {
      return state.category;
    },
    getPageLoading(state) {
      return state.pageLoading;
    },
    getUser(state) {
      return state.user;
    },
    getCart(state) {
      return state.cart;
    },
    getSubtotal(state) {
      return state.subtotal;
    },
    getProduct(state) {
      return state.product;
    },
  },
  mutations: {
    setCategories(state, categories) {
      state.categories = categories;
    },
    setPage(state, page) {
      state.page = page;
    },
    setProducts(state, products) {
      state.products = products;
    },
    setCategory(state, category) {
      state.category = category;
    },
    setPageLoading(state, pageLoading) {
      state.pageLoading = pageLoading;
    },
    setUser(state, user) {
      state.user = user;
    },
    setCart(state, cart) {
      state.cart = cart;
    },
    setSubtotal(state, subtotal) {
      state.subtotal = subtotal;
    },
    setProduct(state, product) {
      state.product = product;
    },
  },
  actions: {
    async getCategories({ commit }, category) {
      const categories = await services.getCategories(category);
      categories.map(async (cate: CategoriesInterface) => {
        const children = await services.getAllChildrenCategories(cate.id);
        cate.children_categories = children;
      });
      const all = {
        id: "MLB1648",
        name: "Todos",
        total_items_in_this_category: await services.getQuantity(category),
      };
      categories.unshift(all);
      commit("setCategories", categories);
    },
    async getProducts({ commit }, { category, page }) {
      commit("setPageLoading", true);
      const products = await services.getProducts(category, page);
      commit("setProducts", products);
      commit("setPageLoading", false);
    },
    async getUser({ commit }, cookies) {
      const user = await services.getProfile(cookies);
      commit("setUser", user);
    },
    pageUp({ commit, state }) {
      commit("setPage", state.page + 1);
    },
    pageDown({ commit, state }) {
      commit("setPage", state.page - 1);
    },
    setCategory({ commit }, category) {
      commit("setCategory", category);
    },
    resetPage({ commit }) {
      commit("setPage", 1);
    },
    setLoading({ commit }, pageLoading) {
      commit("setPageLoading", pageLoading);
    },
    async getCart({ commit }, cookies) {
      const cart = (await services.getCart(cookies)) as OrdersInterface[];
      const allprices = [] as number[];
      cart.map((product) => {
        const price = Number(product.price * product.quantity);
        allprices.push(Number(price.toFixed(2)));
      });
      const subtotal = allprices.reduce((a, b) => a + b, 0);
      commit("setCart", cart);
      commit("setSubtotal", subtotal);
    },
    async addToCart({ commit }, { cookies, product }) {
      await services.addToCart(cookies, product);
      const cart = (await services.getCart(cookies)) as OrdersInterface[];
      const allprices = [] as number[];
      cart.map((product) => {
        const price = Number(product.price * product.quantity);
        allprices.push(Number(price.toFixed(2)));
      });
      const subtotal = allprices.reduce((a, b) => a + b, 0);
      commit("setCart", cart);
      commit("setSubtotal", subtotal);
    },
    async deleteFromCart({ commit }, { cookies, product }) {
      await services.deleteFromCart(cookies, product);
      const cart = (await services.getCart(cookies)) as OrdersInterface[];
      const allprices = [] as number[];
      cart.map((product) => {
        const price = Number(product.price * product.quantity);
        allprices.push(Number(price.toFixed(2)));
      });
      const subtotal = allprices.reduce((a, b) => a + b, 0);
      commit("setCart", cart);
      commit("setSubtotal", subtotal);
    },
    setProduct({ commit }, product) {
      commit("setProduct", product);
    },
  },
  modules: {},
});
