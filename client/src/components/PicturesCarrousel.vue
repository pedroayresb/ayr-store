<template>
  <carousel :items-to-show="1.5" wrap-around>
    <slide v-for="slide in pictures" :key="slide.id">
      <img v-bind:src="slide.url" />
    </slide>

    <template #addons>
      <navigation />
      <pagination />
    </template>
  </carousel>
</template>

<script lang="ts">
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import { PicturesInterface } from "../interfaces/orders.interfaces";

export default {
  name: "PicturesCarrousel",
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },
  props: {
    pictures: {
      type: Array as () => PicturesInterface[],
      required: true,
    },
  },
};
</script>
