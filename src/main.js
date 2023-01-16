import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";

import { createAuth0 } from "@auth0/auth0-vue";
import router from "./router";
import store from "./store";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import { faHeart, faUserSecret } from "@fortawesome/free-solid-svg-icons";
import { faCloudBolt } from "@fortawesome/free-solid-svg-icons";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";

library.add(faUserSecret);
library.add(faCloudBolt);
library.add(faSignOut);
library.add(faHeart);

const app = createApp(App);
app.use(
  createAuth0({
    domain: import.meta.env.VITE_AUTH0_DOMAIN,
    client_id: import.meta.env.VITE_AUTH0_CLIENT_ID,
    redirect_uri: import.meta.env.VITE_AUTH0_CALLBACK_URI,
  })
);
app.use(router);
app.use(store);

app.component("font-awesome-icon", FontAwesomeIcon);

app.mount("#app");
