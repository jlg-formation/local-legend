import HomeRoute from "./HomeRoute.vue";
import LegalRoute from "./LegalRoute.vue";
import ExchangeTokenRoute from "./ExchangeTokenRoute.vue";
import MapRoute from "./MapRoute.vue";

export const routes = [
  { path: "/", name: "Home", component: HomeRoute },
  { path: "/legal", name: "Legal", component: LegalRoute },
  {
    path: "/exchange_token",
    name: "ExchangeToken",
    component: ExchangeTokenRoute,
  },
  { path: "/map", name: "Map", component: MapRoute },
];
