<template>
  <div>
    <HomePageVue />
    <div>
      <PicturesCarrouselVue :pictures="product.pictures" />
      <h1>{{ product.title }}</h1>
      <p>{{ product.price.toFixed(2) }}</p>
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
        console.log(id);
        const response = await services.getProductInfo(id);
        console.log(response);
        store.commit("setProduct", response);
      };
      getProduct();
    }
    const isInCart = (product: string) => {
      return store.state.cart.some((item: any) => item.productId === product);
    };
    const productInCart = (product: string) => {
      return store.state.cart.find((item: any) => item.productId === product);
    };
    return {
      isInCart,
      productInCart,
    };
  },
});
</script>
