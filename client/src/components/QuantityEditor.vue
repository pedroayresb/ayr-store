<template>
  <div className="quantity-editor">
    <button @click="removeQuantity">-</button>
    <p>{{ product?.quantity }}</p>
    <button @click="addQuantity">+</button>
  </div>
</template>

<style scoped>
.quantity-editor {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100px;
}
</style>

<script lang="ts">
import { defineComponent } from "vue";
import store from "../store";

export default defineComponent({
  name: "AddToCartButton",
  props: {
    product: Object,
  },
  computed: {
    cart() {
      return store.state.cart;
    },
  },
  methods: {
    addQuantity() {
      const getCookie = document.cookie.split("=")[1];
      if (!getCookie) {
        alert("You need to be logged in to add to cart");
        return;
      }
      const productToSend = {
        id: this.product?.productId,
        quantity: this.product?.quantity + 1,
      };
      const array = [productToSend];
      const toSend = {
        cookies: getCookie,
        product: array,
      };
      store.dispatch("addToCart", toSend);
    },
    removeQuantity() {
      const getCookie = document.cookie.split("=")[1];
      if (!getCookie) {
        alert("You need to be logged in to add to cart");
        return;
      }
      if (this.product?.quantity === 1) {
        return;
      }
      const productToSend = {
        id: this.product?.productId,
        quantity: this.product?.quantity - 1,
      };
      const array = [productToSend];
      const toSend = {
        cookies: getCookie,
        product: array,
      };
      store.dispatch("addToCart", toSend);
    },
  },
});
</script>
