import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomePage from "../views/StartView.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import CartView from "../views/CartView.vue";
import ProductView from "../views/ProductView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "HomePage",
    component: HomePage,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView,
  },
  {
    path: "/cart",
    name: "cart",
    component: CartView,
  },
  {
    path: "/:id",
    name: "product",
    component: ProductView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
