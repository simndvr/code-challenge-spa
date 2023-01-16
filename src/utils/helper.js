import store from "../store/index";

import axios from "axios";

export const httpRequest = (
  method,
  url,
  data,
  content_type = "application/json",
  responseType = "json"
) => {
  if (!window.navigator.onLine) throw new Error("no_internet");

  return axios({
    headers: {
      "Content-Type": content_type,
      Accept: "application/json",
    },
    method,
    url: import.meta.env.VITE_VANE_API_URL + url,
    data,
    responseType: responseType,
  });
};

export const handleVuexApiCall = async (vuexAction, payload) => {
  try {
    const data = await store.dispatch(vuexAction, payload);
    return { success: true, data };
  } catch (err) {
    if (err.response) {
      // Handle Response Errors
      const errorCode = err.response.data.errorCode;
      const error = getErrorObj(
        errorCode,
        err.response.data.errors,
        err.response.data.message
      );
      return {
        success: false,
        error,
        errorCode,
      };
    } else if (err.message === "no_internet") {
      return {
        success: false,
        error: {
          message:
            "We're having trouble connecting with the server. Please check your internet connection.",
          type: "error",
        },
      };
    } else {
      // Throw an error if the error is not an HTTP response
      throw err;
    }
  }
};
