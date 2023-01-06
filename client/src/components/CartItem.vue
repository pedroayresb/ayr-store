<template>
  <div>
    <div class="cart-item">
      <div class="cart-item__image">
        <img :src="product.thumbnail" alt="product image" />
      </div>
      <div class="cart-item__info">
        <p>{{ product.title }}</p>
        <p className="price">
          R$ {{ (item.price * item.quantity).toFixed(2) }}
        </p>
        <QuantityEditorVue :product="item" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  OrdersInterface,
  ProductsInterface,
} from "../interfaces/orders.interfaces";
import services from "../utils/services";
import QuantityEditorVue from "./QuantityEditor.vue";

export default defineComponent({
  name: "CartItem",
  props: {
    item: {
      type: Object as () => OrdersInterface,
      required: true,
    },
  },
  components: {
    QuantityEditorVue,
  },
  data() {
    return {
      product: {} as ProductsInterface,
    };
  },
  setup() {
    const getProduct = async (id: string) => {
      const response = await services.getProductInfo(id);
      return response;
    };
    return {
      getProduct,
    };
  },
  mounted() {
    this.getProduct(this.item.productId).then((response) => {
      this.product = response as ProductsInterface;
    });
  },
});
</script>
