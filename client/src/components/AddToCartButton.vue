<template>
  <div>
    <button @click="addToCart">Add to Cart</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import store from "../store";

export default defineComponent({
  name: "AddToCartButton",
  props: {
    product: Object,
  },
  methods: {
    addToCart() {
      const getCookie = document.cookie.split("=")[1];
      if (!getCookie) {
        alert("You need to be logged in to add to cart");
        return;
      }
      const product = {
        id: this.product?.id,
        quantity: 1,
        price: this.product?.price,
      };
      const array = [product];
      const toSend = {
        cookies: getCookie,
        product: array,
      };
      store.dispatch("addToCart", toSend);
    },
  },
});
</script>
