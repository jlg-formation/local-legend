import { createApp } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import App from "./App.vue";
import { routes } from "./components/routes/config";
import { fontawesome } from "./plugins/font-awesome";
import "./style.scss";
import { createPinia } from "pinia";

window.scrollTo(0, 1);

const pinia = createPinia();

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

const app = createApp(App);
app.use(fontawesome);
app.use(router);
app.use(pinia);

app.mount("#app");
