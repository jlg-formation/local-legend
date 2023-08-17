import HomeRoute from "./HomeRoute.vue";
import LegalRoute from "./LegalRoute.vue";
import ExchangeTokenRoute from "./ExchangeTokenRoute.vue";
import SigninRoute from "./SigninRoute.vue";
import UserRoute from "./UserRoute.vue";

export const routes = [
  { path: "/", name: "Home", component: HomeRoute },
  { path: "/legal", name: "Legal", component: LegalRoute },
  {
    path: "/exchange_token",
    name: "ExchangeToken",
    component: ExchangeTokenRoute,
  },
  { path: "/signin", name: "Signin", component: SigninRoute },
  { path: "/user", name: "User", component: UserRoute },
];
