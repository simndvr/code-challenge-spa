<template>
  <div class="flex flex-row justify-between w-full h-screen px-8">
    <div class="flex flex-col w-full">
      <div class="flex flex-row justify-center mt-10 py-10 items-center">
        <div class="w-1/5 lg:w-1/12 mr-3">
          <img class="rounded-lg object-cover h-auto border-slate-700 border-2" :src="user.picture" />
        </div>
        <div class="flex flex-col justify-center text-start">
          <div class="max-w-prose">
            <span class="font-bold text-md md:text-2xl lg:text-3xl">{{ user.name }}</span>
          </div>
          <div class="max-w-prose">
            <span class="font-thin text-xs md:text-xl lg:text-lg">{{ user.nickname }}</span>
          </div>
          <div class="max-w-prose">
            <a 
              :href="`https://github.com/${ user.nickname }`" 
              class="underline text-sky-500 font-thin text-sm md:text-md lg:text-md max-w-prose">
              https://github.com/{{ user.nickname }}
            </a>
          </div>
        </div>
      </div>
      <div class="flex flex-col items-center justify-center w-full md:w-3/5 lg:w-1/3 max-w-lg mx-auto">
        <form @submit.prevent="displayWeather">
          <span>Input a city here</span>
          <div class="mt-5 w-full">
            <input class="rounded-sm px-4 py-2 w-full text-black" v-model="city" placeholder="Enter a city name"
              type="text" @keyup.enter="displayWeather" required />
          </div>
          <div class="mt-5 w-full">
            <button
              class="bg-orange-500 px-4 py-2  w-full rounded-md transition shadow-xl ease-in-out hover:bg-orange-600"
              type="submit">
              Display weather
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { useAuth0 } from '@auth0/auth0-vue';
import router from '../router';
import { ref } from 'vue';

export default {
  setup() {
    const city = ref('')
    const { user, isAuthenticated } = useAuth0();

    async function displayWeather() {
      router.push({ path: '/weather', query: { city: city.value } })
    }

    return {
      displayWeather,
      city,
      user,
      isAuthenticated,
    };
  }
};
</script>