<template>
  <router-view></router-view>
</template>

<script>
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './main';

export default {
  created() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (this.$route.path === '/') {
          this.$router.push('/panel');
        }
      } else {
        if (this.$route.path !== '/') {
          this.$router.push('/');
        }
      }
    });
  }
}
</script>
