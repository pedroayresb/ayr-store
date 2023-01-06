<template>
  <div class="home">
    <LoginForm />
  </div>
</template>

<style>
.logo {
  height: 40vmin;
  pointer-events: none;
  background-color: black;
}
</style>

<script lang="ts">
import { defineComponent } from "vue";
import LoginForm from "../components/LoginForm.vue";

export default defineComponent({
  name: "HomeView",
  components: {
    LoginForm,
  },
});
</script>
