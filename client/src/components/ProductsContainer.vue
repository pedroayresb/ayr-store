<template>
  <div>
    <div v-bind:key="index" v-for="(product, index) in products">
      <img :src="product.thumbnail" />
      <p>{{ product.title }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState } from "vuex";

export default defineComponent({
  name: "ProductsContainer",
  computed: {
    ...mapState(["products"]),
  },
});
</script>
