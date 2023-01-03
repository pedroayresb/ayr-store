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
  },
  actions: {
    async getCategories({ commit }, category) {
      const categories = await services.getCategories(category);
      const allQuantity = await services.getQuantity(category);
      const all = {
        id: "MLB1648",
        name: "Todos",
        total_items_in_this_category: allQuantity,
      };
      categories.unshift(all);
      commit("setCategories", categories);
    },
    async getProducts({ commit }, { category, page }) {
      const products = await services.getProducts(category, page);
      commit("setProducts", products);
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
  },
  modules: {},
});
