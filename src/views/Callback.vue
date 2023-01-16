<template>
  <div class="grid h-screen place-items-center text-lg font-black">
    Redirecting to Home...
  </div>
</template>
<script>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth0 } from '@auth0/auth0-vue';
import store from "../store/index";

export default {
  setup() {
    const router = useRouter()
    const { isAuthenticated, getAccessTokenSilently } = useAuth0()
    
    async function verifyAuth() {
      if (isAuthenticated) {
        const token = await getAccessTokenSilently()
        await store.dispatch("handleLogin", token)
        return router.push({ name: "Home" }).catch((err) => err);
      }
    }

    onMounted(() => {
      verifyAuth()
    });
  }
  }
</script>