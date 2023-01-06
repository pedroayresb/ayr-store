<template>
  <div>
    <div class="cart-item" @click.self="routeToProduct(product.id)">
      <div class="cart-item__image" @click="routeToProduct(product.id)">
        <img :src="product.thumbnail" alt="product image" />
      </div>
      <div class="cart-item__info" @click.self="routeToProduct(product.id)">
        <p @click.self="routeToProduct(product.id)">{{ product.title }}</p>
        <p className="price" @click.self="routeToProduct(product.id)">
          R$ {{ item.price.toFixed(2) }} * {{ item.quantity }} = R$
          {{ (item.price * item.quantity).toFixed(2) }}
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
import router from "../router";

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
  methods: {
    routeToProduct(id: string) {
      router.push(`/${id}`);
    },
  },
});
</script>
