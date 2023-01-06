<template>
  <button @click="confirmPurchase">Confimar compra</button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import store from "../store";
import router from "../router";
import services from "../utils/services";

export default defineComponent({
  name: "ConfirmPurchaseButton",
  methods: {
    async confirmPurchase() {
      const token = document.cookie.split("=")[1];
      const order = store.state.cart;
      await services.createOrder(order, token);
      store.dispatch("getCart", token);
      router.push("/");
    },
  },
});
</script>
