<template>
  <div v-if="user.username.length !== 0">
    <p>User: {{ user.username }}</p>
    <p>Cart: {{ cart.length }}</p>
    <button @click="logout">Logout</button>
  </div>
  <div v-else>
    <router-link to="/login">Login</router-link>
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
