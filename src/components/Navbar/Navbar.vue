<template>
  <div class="flex flex-row items-center justify-between w-full h-20 bg-orange-600 shadow-md px-5 lg:px-10">
    <div class="flex">
      <router-link to="/home" class="flex flex-row align-middle font-bold text-lg">
        <font-awesome-icon class="icon text-4xl mr-3" icon="fa-solid fa-cloud-bolt"/>
        Vane
      </router-link>
    </div>
    <div class="flex">
      <button v-if="isAuthenticated" 
        class="hidden md:block align-middle shadow-lg px-4 h-12 bg-white text-black rounded-lg" 
        @click="logoutUser">
        Log out
      </button>
      <button v-if="isAuthenticated" @click="logoutUser">
        <font-awesome-icon class="block md:hidden align-middle icon text-xl bg-white text-black p-2 rounded-lg" 
        icon="fa-solid fa-sign-out"/>
      </button>
    </div>

  </div>
</template>
<script>
  import { useAuth0 } from '@auth0/auth0-vue';

  export default {
    setup() {
      const { logout, isAuthenticated } = useAuth0();

      async function logoutUser() {
        await logout()
        localStorage.removeItem("auth0");
        await store.dispatch("handleLogout")
        return router.push({ name: "Login" }).catch((err) => err);
      }

      return {
        logoutUser,
        isAuthenticated
      };
    }
  };
</script>