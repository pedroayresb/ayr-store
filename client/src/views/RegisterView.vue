<template>
  <div class="home">
    <img
      alt="Ayr Logo"
      src="../assets/logo-no-background.png"
      className="logo"
    />
    <RegisterForm msg="This will be my start page" />
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
import RegisterForm from "../components/RegisterForm.vue";

export default defineComponent({
  name: "RegisterView",
  components: {
    RegisterForm,
  },
});
</script>
