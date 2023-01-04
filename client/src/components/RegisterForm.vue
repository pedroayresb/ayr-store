<template>
  <form>
    <div>
      <label htmlFor="name">Nome de usuario: </label>
      <input type="text" name="name" v-model="username" />
    </div>
    <div>
      <label htmlFor="password">Email: </label>
      <input type="email" name="email" v-model="email" />
    </div>
    <div>
      <label htmlFor="password">Senha: </label>
      <input type="password" name="password" v-model="password" />
    </div>
    <button type="button" @click="register">Entrar</button>
  </form>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import services from "../utils/services";
import router from "../router";

export default defineComponent({
  name: "RegisterForm",
  data() {
    return {
      username: "",
      email: "",
      password: "",
    };
  },
  methods: {
    async register() {
      const response = await services.register(
        this.username,
        this.email,
        this.password
      );
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
