<template>
  <div
    @mouseover="showOptions = true"
    @mouseleave="showOptions = false"
    className="options-1"
  >
    <p @click="updateProducts">
      {{ category?.name }}
    </p>
    <div v-if="showOptions">
      <SubCategoriesVue
        v-for="subCategory in category?.children_categories"
        :key="subCategory.id"
        :category="subCategory"
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
import SubCategoriesVue from "./SubCategories.vue";

export default defineComponent({
  name: "CategoriesContainer",
  props: {
    category: Object,
  },
  components: {
    SubCategoriesVue,
  },
  data() {
    return {
      showOptions: false,
      showSecondOptions: false,
      showThirdOptions: false,
      showFourthOptions: false,
    };
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
