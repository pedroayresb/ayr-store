<template>
  <div class="home">
    <HomePage />
    <CategoriesContainer />
    <PagesContainer />
    <ProductsContainer />
    <PagesContainer />
  </div>
</template>

<style>
.logo {
  height: 40vmin;
  pointer-events: none;
  background-color: black;
}
</style>

<script lang="ts">
import { defineComponent } from "vue";
import HomePage from "../components/HomePage.vue";
import CategoriesContainer from "../components/CategoriesContainer.vue";
import ProductsContainer from "../components/ProductsContainer.vue";
import PagesContainer from "../components/PagesContainer.vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "HomeView",
  components: {
    HomePage,
    CategoriesContainer,
    ProductsContainer,
    PagesContainer,
  },
  setup() {
    const store = useStore();
    const getCookie = document.cookie.split("=")[1];
    if (getCookie) {
      store.dispatch("getUser", getCookie);
      store.dispatch("getCart", getCookie);
    }
  },
  data() {
    const store = useStore();
    store.dispatch("getCategories", "MLB1648");
    store.dispatch("getProducts", {
      category: "MLB1648",
      page: store.state.page,
    });
  },
});
</script>
