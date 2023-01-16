import { createStore } from "vuex";
import weather from "./weather";
import auth from "./auth";

const store = createStore({
  modules: {
    weather,
    auth,
  },
});

export function useStore() {
  return store;
}

export default store;
