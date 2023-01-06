<template>
  <div>
    <HomePageVue />
    <div v-if="cart.length !== 0">
      <CartItemVue v-for="item in cart" :key="item.id" :item="item" />
      <SubtotalContainerVue />
    </div>
    <div v-else>
      <p>Your cart is empty</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState, useStore } from "vuex";
import HomePageVue from "../components/HomePage.vue";
import CartItemVue from "../components/CartItem.vue";
import SubtotalContainerVue from "../components/SubtotalContainer.vue";

export default defineComponent({
  name: "CartView",
  computed: {
    ...mapState(["user", "cart"]),
  },
  components: {
    HomePageVue,
    CartItemVue,
    SubtotalContainerVue,
  },
  setup() {
    const store = useStore();
    const getCookie = document.cookie.split("=")[1];
    if (getCookie) {
      store.dispatch("getUser", getCookie);
      store.dispatch("getCart", getCookie);
    }
  },
});
</script>
