<template>
  <form>
    <div>
      <label htmlFor="name">Nome de usuario ou Email: </label>
      <input type="text" name="name" v-model="username" />
    </div>
    <div>
      <label htmlFor="password">Senha: </label>
      <input type="password" name="password" v-model="password" />
    </div>
    <button type="button" @click="login">Entrar</button>
    <router-link to="/register">Register</router-link>
  </form>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import services from "../utils/services";
import router from "../router";

export default defineComponent({
  name: "LoginForm",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async login() {
      const response = await services.login(this.username, this.password);
      const asCookie = `token=${response}; path=/;`;
      document.cookie = asCookie;
      router.push("/");
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
