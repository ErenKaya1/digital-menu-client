import axios from "axios";
import store from "@/store/index";
import router from "@/router/index";
import cookie from "vue-cookie";

const httpClient = axios.create({
  baseURL: process.env.VUE_APP_BACKEND_URL || "http://api.erenkaya.tk",
  withCredentials: true,
});

httpClient.interceptors.request.use(
  (config) => {
    if (store.state.token) config.headers["Authorization"] = `Bearer ${store.state.token}`;

    if (store.state.isPersistent) config.headers["X-IsPersistent"] = true;
    else config.headers["X-IsPersistent"] = false;

    if (cookie.get("lang")) config.headers["X-Language"] = cookie.get("lang").toLowerCase();
    else config.headers["X-Language"] = "tr";

    if (cookie.get("currency")) config.headers["X-Currency"] = cookie.get("currency").toLowerCase();
    else config.headers["X-Currency"] = "try";

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

httpClient.interceptors.response.use(
  (response) => {
    if (response.headers["x-new-jwt-token"]) {
      store.dispatch("setToken", response.headers["x-new-jwt-token"]);
    }
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      store.dispatch("setToken", null);
      store.dispatch("setUser", null);
      if (router.currentRoute.name !== "Login") router.push("/login");
    }

    return error.response;
  }
);

export default httpClient;
