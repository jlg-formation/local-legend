import { createApp } from "vue";
import App from "./App.vue";
import { fontawesome } from "./plugins/font-awesome";
import "./style.scss";

const app = createApp(App);
app.use(fontawesome);

app.mount("#app");
