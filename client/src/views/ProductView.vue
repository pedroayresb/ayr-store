<template>
  <div>
    <HomePageVue />
    <div>
      <PicturesCarrouselVue :pictures="product.pictures" />
      <h1>{{ product.title }}</h1>
      <p>R$ {{ product.price.toFixed(2) }}</p>
      <a v-bind:href="product.permalink">MERCADO LIVRE</a>
      <AddToCartButtonVue :product="product" v-if="!isInCart(product.id)" />
      <QuantityEditorVue
        :product="productInCart(product.id)"
        v-if="isInCart(product.id)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState, useStore } from "vuex";
import { OrdersInterface } from "../interfaces/orders.interfaces";
import HomePageVue from "../components/HomePage.vue";
import PicturesCarrouselVue from "../components/PicturesCarrousel.vue";
import AddToCartButtonVue from "../components/AddToCartButton.vue";
import QuantityEditorVue from "../components/QuantityEditor.vue";
import services from "../utils/services";

export default defineComponent({
  name: "ProductView",
  computed: {
    ...mapState(["user", "product", "products", "pageLoading", "cart"]),
  },
  components: {
    HomePageVue,
    PicturesCarrouselVue,
    AddToCartButtonVue,
    QuantityEditorVue,
  },
  setup() {
    const store = useStore();
    const id = window.location.pathname;
    const getCookie = document.cookie.split("=")[1];
    if (getCookie) {
      store.dispatch("getUser", getCookie);
      const getProduct = async () => {
        const response = await services.getProductInfo(id);
        store.commit("setProduct", response);
      };
      getProduct();
    }
    const isInCart = (product: string) => {
      return store.state.cart.some(
        (item: OrdersInterface) => item.productId === product
      );
    };
    const productInCart = (product: string) => {
      return store.state.cart.find(
        (item: OrdersInterface) => item.productId === product
      );
    };
    return {
      isInCart,
      productInCart,
    };
  },
});
</script>
