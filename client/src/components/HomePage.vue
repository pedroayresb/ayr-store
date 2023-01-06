<template>
  <div v-if="user.username.length !== 0">
    <p>User: {{ user.username }}</p>
    <router-link to="/cart">Cart: {{ cart.length }}</router-link>
    <button @click="logout">Logout</button>
  </div>
  <div v-else>
    <router-link to="/login">Login | Register</router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState } from "vuex";

export default defineComponent({
  name: "HomePage",
  computed: {
    ...mapState(["user", "cart"]),
  },
  methods: {
    logout() {
      document.cookie = "token=";
      window.location.reload();
    },
  },
});
</script>
