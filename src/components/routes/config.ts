import { useRouter } from "vue-router";
import { useUserStore } from "../../stores/user.store";
import ApiKeyRoute from "./ApiKeyRoute.vue";
import ExchangeTokenRoute from "./ExchangeTokenRoute.vue";
import HomeRoute from "./HomeRoute.vue";
import LegalRoute from "./LegalRoute.vue";
import SigninRoute from "./SigninRoute.vue";
import UserRoute from "./UserRoute.vue";

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

export const configGuards = () => {
  const router = useRouter();
  const freeRoutes = [
    SIGNIN_NAMEROUTE,
    LEGAL_NAMEROUTE,
    EXCHANGE_TOKEN_NAMEROUTE,
    APIKEY_NAMEROUTE,
  ];
  router.beforeEach(async (to) => {
    if (typeof to.name !== "string") {
      return;
    }
    const userStore = useUserStore();
    if (
      // make sure the user is authenticated
      !userStore.isAuthenticated &&
      // ❗️ Avoid an infinite redirect
      !freeRoutes.includes(to.name)
    ) {
      // redirect the user to the login page
      return { name: SIGNIN_NAMEROUTE };
    }
  });
};
