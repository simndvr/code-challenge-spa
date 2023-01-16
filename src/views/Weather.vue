<template>
  <div class="grid h-screen place-items-center" v-if="!isWeatherDataFound && loader == true">
    <span class="text-lg font-black">Loading weather data...</span> 
    <router-link class="bg-orange-500 px-4 py-2 rounded-md transition shadow-xl ease-in-out hover:bg-orange-600"
      to="/home">Change location (Back)
    </router-link>
  </div>
  <div class="grid h-screen place-items-center" v-if="!isWeatherDataFound && !loader">
    <span class="text-lg font-black">Loading weather data...</span> 
    <router-link class="bg-orange-500 px-4 py-2 rounded-md transition shadow-xl ease-in-out hover:bg-orange-600"
      to="/home">Change location (Back)
    </router-link>
  </div>
  <div class="flex flex-row w-full h-full px-8" v-else>
    <div class="flex flex-col w-full">
      <div class="mt-10"><span class="font-black text-xl max-w-prose">Weather Forecast</span></div>
      <img class="rounded-lg object-cover mt-5 h-auto w-2/5 lg:w-1/6 max-w-lg mr-4 bg-slate-600 bg-opacity-30 place-self-center" 
        :src="`http://openweathermap.org/img/wn/${weatherData?.list[0]?.weather[0]?.icon}@2x.png`" />
      <div class="mt-3"><span class="font-black text-2xl max-w-prose">{{ weatherData?.city?.name }}</span></div>
      
      <table class="border-separate border-spacing-y-2 mt-8 w-full md:w-4/5 xl:w-3/5 mx-auto">
        <thead>
          <tr>
            <th class="font-thin text-sm">DATE</th>
            <th class="font-thin text-sm">°F</th>
            <th class="hidden lg:table-cell font-thin text-sm">DESCRIPTION</th>
            <th class="hidden lg:table-cell font-thin text-sm">MAIN</th>
            <th class="hidden lg:table-cell font-thin text-sm">PRESSURE</th>
            <th class="hidden lg:table-cell font-thin text-sm">HUMIDITY</th>
          </tr>
        </thead>
        <tbody v-for="forecast in weatherData.list" class="">
          <tr class="bg-slate-600 bg-opacity-20 h-5 lg:h-8">
            <td class="">{{ parseDate(forecast.dt_txt) }}</td>
            <td class="font-black">{{ forecast.main.temp }}</td>
            <td class="hidden lg:table-cell">{{ forecast.weather[0].description }}</td>
            <td class="hidden lg:table-cell font-black">{{ forecast.weather[0].main }}</td>
            <td class="hidden lg:table-cell">{{ forecast.main.pressure }}</td>
            <td class="hidden lg:table-cell">{{ forecast.main.humidity }}</td>
          </tr>
        </tbody>
      </table>

      <div class="text-end mt-10 mb-10"><router-link class="bg-orange-500 px-4 py-2 rounded-md transition shadow-xl ease-in-out hover:bg-orange-600"
        to="/home">Change location (Back)</router-link></div>
    </div>
  </div>
</template>
<script>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { handleVuexApiCall } from "../utils/helper";
import moment from 'moment';

export default {
  setup() {
    let isWeatherDataFound = ref(false)
    let loader = ref(true)
    let weatherData = ref({})
    const route = useRoute()

    function parseDate(dateString) {
      return moment(dateString).format("MM/DD/YYYY hh:mm a")
    }

    async function displayWeather() {
      const response = await handleVuexApiCall("handleFetchWeather", { city: route.query.city })
      isWeatherDataFound.value = true
      loader.value = false
      weatherData.value = response.data
    }

    onMounted(() => {
      displayWeather()
    });

    return {
      parseDate,
      displayWeather,
      isWeatherDataFound,
      weatherData,
    };
  }
};
</script>