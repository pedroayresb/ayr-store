<template>
  <form>
    <div>
      <label htmlFor="name">Nome de usuario ou Email: </label>
      <input type="text" name="name" />
    </div>
    <div>
      <label htmlFor="password">Senha: </label>
      <input type="password" name="password" />
    </div>
    <button type="submit">Entrar</button>
    <router-link to="/register">Register</router-link>
  </form>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "LoginForm",
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
