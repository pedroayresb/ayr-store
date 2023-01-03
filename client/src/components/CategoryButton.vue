<template>
  <button @click="updateProducts">
    {{ category?.name }}
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import store from "../store";

export default defineComponent({
  name: "CategoriesContainer",
  props: {
    category: Object,
  },
  methods: {
    updateProducts() {
      store.dispatch("setCategory", this.category);
      store.dispatch("resetPage");
      store.dispatch("getProducts", {
        category: this.category?.id,
        page: store.state.page,
      });
    },
  },
});
</script>
