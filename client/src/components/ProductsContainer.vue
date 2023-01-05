<template>
  <div>
    <p v-if="pageLoading">Carregando...</p>
    <div className="products-container" v-if="!pageLoading">
      <div
        v-bind:key="index"
        v-for="(product, index) in products"
        className="product"
      >
        <img :src="product.thumbnail" />
        <p>{{ product.title }}</p>
        <p>R$ {{ product.price.toFixed(2) }}</p>
        <AddToCartButtonVue :product="product" v-if="!isInCart(product.id)" />
        <QuantityEditorVue
          :product="productInCart(product.id)"
          v-if="isInCart(product.id)"
        />
      </div>
    </div>
  </div>
</template>

<style>
.products-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin: 10px;
}
.product {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10px;
  width: 200px;
  height: 300px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 5px #ccc;
}
</style>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState } from "vuex";
import AddToCartButtonVue from "./AddToCartButton.vue";
import QuantityEditorVue from "./QuantityEditor.vue";
import store from "../store";

export default defineComponent({
  name: "ProductsContainer",
  components: {
    AddToCartButtonVue,
    QuantityEditorVue,
  },
  computed: {
    ...mapState(["products", "pageLoading", "cart"]),
  },
  setup() {
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
