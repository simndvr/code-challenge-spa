import { createRouter, createWebHistory } from "vue-router";
import { authGuard } from "@auth0/auth0-vue";
import { useAuth0 } from "@auth0/auth0-vue";

import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Weather from "../views/Weather.vue";
import Error404 from "../components/ErrorPage.vue";
import Callback from "../views/Callback.vue";

const DEFAULT_WINDOW_TITLE = "Vane";

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
    meta: {
      title: "Welcome to Vane",
      requiresNoAuth: true,
    },
  },
  {
    path: "/callback",
    name: "Callback",
    component: Callback,
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    beforeEnter: authGuard,
    meta: {
      title: "Home | Vane",
      requiresAuth: true,
    },
  },
  {
    path: "/weather",
    name: "Weather",
    component: Weather,
    beforeEnter: authGuard,
    meta: {
      title: "Weather | Vane",
      requiresAuth: true,
    },
  },
  {
    path: "/:catchAll(.*)*",
    name: "Error",
    component: Error404,
    meta: { title: "Page Not Found" },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

/* change the window title with the title name of the destination route */
router.afterEach((to) => {
  document.title = to.meta.title || DEFAULT_WINDOW_TITLE;
});

router.beforeEach((to, from, next) => {
  const isAuthenticatedUser = !!localStorage.getItem("auth0");
  if (to.meta.requiresAuth && !isAuthenticatedUser) {
    next({ name: "Login" });
  } else if (
    to.meta.requiresNoAuth &&
    isAuthenticatedUser &&
    to.name === "Login"
  ) {
    next({ name: "Home" });
  }
  next();
});

export default router;
