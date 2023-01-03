<template>
  <div>
    <button @click="previousPage" v-if="page - 1 !== 0">&lt;</button>
    <button @click="previousPage" v-if="page - 1 !== 0">{{ page - 1 }}</button>
    <p>{{ page }}</p>
    <button
      @click="nextPage"
      v-if="category.total_items_in_this_category / 50 > page + 1"
    >
      {{ page + 1 }}
    </button>
    <button
      @click="nextPage"
      v-if="category.total_items_in_this_category / 50 > page + 1"
    >
      &gt;
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import store from "../store";
import { mapState } from "vuex";

export default defineComponent({
  name: "PagesContainer",
  computed: {
    ...mapState(["page", "category", "products"]),
  },
  methods: {
    nextPage() {
      store.dispatch("pageUp");
      store.dispatch("getProducts", {
        category: this.category?.id,
        page: store.state.page,
      });
    },
    previousPage() {
      store.dispatch("pageDown");
      store.dispatch("getProducts", {
        category: this.category?.id,
        page: store.state.page,
      });
    },
  },
});
</script>
