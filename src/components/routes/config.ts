import HomeRoute from "./HomeRoute.vue";
import LegalRoute from "./LegalRoute.vue";
import ExchangeTokenRoute from "./ExchangeTokenRoute.vue";
import SigninRoute from "./SigninRoute.vue";
import UserRoute from "./UserRoute.vue";
import ApiKeyRoute from "./ApiKeyRoute.vue";

export const HOME_NAMEROUTE = "Home";
export const LEGAL_NAMEROUTE = "Legal";
export const SIGNIN_NAMEROUTE = "Signin";
export const EXCHANGE_TOKEN_NAMEROUTE = "ExchangeToken";
export const USER_NAMEROUTE = "User";
export const APIKEY_NAMEROUTE = "ApiKey";

export const routes = [
  { path: "/", name: HOME_NAMEROUTE, component: HomeRoute },
  { path: "/legal", name: LEGAL_NAMEROUTE, component: LegalRoute },
  {
    path: "/exchange_token",
    name: EXCHANGE_TOKEN_NAMEROUTE,
    component: ExchangeTokenRoute,
  },
  { path: "/signin", name: SIGNIN_NAMEROUTE, component: SigninRoute },
  { path: "/user", name: USER_NAMEROUTE, component: UserRoute },
  { path: "/api-key", name: APIKEY_NAMEROUTE, component: ApiKeyRoute },
];
