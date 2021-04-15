<template>
  <div class="home">
    <img alt="Hike Hack logo" src="../assets/logo.png">
    <template v-if="authenticated">
    <h3>Welcome!</h3>
    </template>
    <template  v-else>
    <Login @authenticated="onAuthenticated" />
    <p>Need an account?</p>
    <Register />
    </template>
  </div>
</template>

<script>
// @ is an alias to /src
import Login from '@/components/Login.vue';
import Register from '@/components/Register.vue';
export default {
  name: 'Home',
  data() {
    return {
      authenticated: false
    };
  },
  components: {
    Login,
    Register
  },
  methods: {
    onAuthenticated() {
      this.$emit("authenticated");
      this.authenticated = true;
    }
  }
}
</script>
<style scoped>
.home img {
  width: 100%;
  max-width: 400px;
}
</style>
