<template>
  <div>
    <p>Subtotal: {{ subtotal.toFixed(2) }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState } from "vuex";

export default defineComponent({
  name: "SubtotalContainer",
  computed: {
    ...mapState(["subtotal"]),
  },
});
</script>
