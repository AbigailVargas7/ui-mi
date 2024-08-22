<template>
  <router-view></router-view>
</template>

<script>
import { onAuthStateChanged } from "firebase/auth";
import { ref, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { auth } from './firebase';

export default {
  setup() {
    const user = ref(null);
    const emailVerified = ref(false);
    const router = useRouter();
    const route = useRoute();

    const redirectBasedOnAuth = () => {
      if (user.value) {
        if (emailVerified.value) {
          if (route.path === '/' || route.path === '/register') {
            router.push('/panel');
          }
        } else {
          if (route.path === '/panel' || route.path === '/tabla') {
            router.push({ path: '/', query: { message: 'verify-email' } });
          }
        }
      } else {
        if (route.path === '/panel' || route.path === '/tabla') {
          router.push('/');
        }
      }
    };

    onMounted(() => {
      onAuthStateChanged(auth, (currentUser) => {
        user.value = currentUser;
        emailVerified.value = currentUser?.emailVerified || false;
        redirectBasedOnAuth();
      });
    });

    watch(() => route.path, () => {
      redirectBasedOnAuth();
    });

    return {
      user,
      emailVerified
    };
  }
}
</script>
