<template>
  <div class="flex flex-row justify-between w-full h-screen px-8">
    <div class="flex flex-col w-full lg:w-2/5 mx-auto">
      <div class="bg-clip-text bg-gradient-to-t from-orange-600 to-sky-400 text-opacity-10">
        <font-awesome-icon class="icon text-9xl mt-10" icon="fa-solid fa-cloud-bolt"/>
      </div>
      
      <div class="mt-5"><span class="bg-gradient-to-t from-orange-600 to-sky-400 bg-clip-text text-transparent font-black text-4xl">Vane</span></div>
      <div class="flex flex-col mt-5">
        <span class="text-lg">Welcome to Vane!</span>
        <span class="mt-2 w-full lg:w-2/3 max-w-lg mx-auto">Please login using your Github credentials to use the application and view the weather in your city.</span>
      </div>
      <div class="text-center mt-10"><button class="bg-orange-500 px-4 py-2 w-full lg:w-2/3 max-w-lg rounded-md transition shadow-xl ease-in-out hover:bg-orange-600"
        @click="login">Login</button></div>
    </div>
  </div>
</template>
<script>
import { useAuth0 } from '@auth0/auth0-vue';

export default {
  setup() {
    const { loginWithRedirect } = useAuth0();

    async function login () {
      await loginWithRedirect({
        appState: {
          target: "/"
        }
      })
    }

    return {
      login
    };
  }
};
</script>