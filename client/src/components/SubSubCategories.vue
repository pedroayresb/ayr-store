<template>
  <div
    @mouseover="showOptions = true"
    @mouseleave="showOptions = false"
    className="options-1"
  >
    <p @click="updateProducts(category?.id)">
      {{ category?.name }}
    </p>
    <div v-if="showOptions" className="options-3">
      <SubSubSubCategoriesVue
        v-for="subSubCategory in category?.children_categories"
        :key="subSubCategory.id"
        :category="subSubCategory"
      />
    </div>
  </div>
</template>

<style scoped>
.options-1 {
  width: fit-content;
  border: 1px solid black;
  border-radius: 5px;
  padding: 5px;
  cursor: pointer;
  display: flex;
  flex-direction: row;
}
</style>

<script lang="ts">
import { defineComponent } from "vue";
import store from "../store";
import SubSubSubCategoriesVue from "./SubSubSubCategories.vue";

export default defineComponent({
  name: "SubSubCategoriesContainer",
  props: {
    category: Object,
  },
  components: {
    SubSubSubCategoriesVue,
  },
  data() {
    return {
      showOptions: false,
    };
  },
  methods: {
    updateProducts(category: string) {
      store.dispatch("setCategory", this.category);
      store.dispatch("resetPage");
      store.dispatch("getProducts", {
        category: category,
        page: store.state.page,
      });
    },
  },
});
</script>
