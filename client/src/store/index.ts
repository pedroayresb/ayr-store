import { createStore } from "vuex";
import {
  CategoriesInterface,
  ProductsInterface,
} from "../interfaces/orders.interfaces";
import services from "../utils/services";

export default createStore({
  state: {
    categories: [] as CategoriesInterface[],
    page: 1,
    clicked: false,
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
  },
  getters: {
    getCategories(state) {
      return state.categories;
    },
    getPage(state) {
      return state.page;
    },
    getClicked(state) {
      return state.clicked;
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
  },
  mutations: {
    setCategories(state, categories) {
      state.categories = categories;
    },
    setPage(state, page) {
      state.page = page;
    },
    setClicked(state, clicked) {
      state.clicked = clicked;
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
  },
  modules: {},
});
