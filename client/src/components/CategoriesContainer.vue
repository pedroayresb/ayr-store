<template>
  <div>
    <CategoryButtonVue
      v-bind:key="index"
      v-for="(category, index) in categories"
      :category="category"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CategoryButtonVue from "./CategoryButton.vue";
import { mapState } from "vuex";

export default defineComponent({
  name: "CategoriesContainer",
  components: {
    CategoryButtonVue,
  },
  computed: {
    ...mapState(["categories"]),
  },
});
</script>
