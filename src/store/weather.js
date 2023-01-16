import { httpRequest } from "../utils/helper";

const state = {
  coord: {
    lon: null,
    lat: null,
  },
  weather: [
    {
      id: null,
      main: "",
      description: "",
      icon: "",
    },
  ],
  base: "",
  main: {
    temp: null,
    feels_like: null,
    temp_min: null,
    temp_max: null,
    pressure: null,
    humidity: null,
  },
  visibility: null,
  wind: {
    speed: null,
    deg: null,
  },
  clouds: {
    all: null,
  },
  dt: null,
  sys: {
    type: null,
    id: null,
    country: "",
    sunrise: null,
    sunset: null,
  },
  timezone: null,
  id: null,
  name: "",
  cod: null,
};

const mutations = {
  SET_WEATHER_DETAILS(state, weatherDetails) {
    state.weatherDetails = weatherDetails;
  },
};

const getters = {
  getWeatherDetails: (state) => state.weatherDetails,
};

const actions = {
  async handleFetchWeather({ commit }, payload) {
    const result = await httpRequest(
      "get",
      `/api/weather?city=${payload.city}`,
      {}
    );

    commit("SET_WEATHER_DETAILS", { ...result.data });
    return result.data;
  },
};

export default { state, getters, actions, mutations };
