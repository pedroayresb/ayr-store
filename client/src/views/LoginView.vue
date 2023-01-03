<template>
  <div class="home">
    <img
      alt="Ayr Logo"
      src="../assets/logo-no-background.png"
      className="logo"
    />
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
