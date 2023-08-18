/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */
import {
  faUserSecret,
  faRightToBracket,
  faAngleRight,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { Plugin } from "vue";

/* add icons to the library */
library.add(faUserSecret, faRightToBracket, faAngleRight, faXmark);

export const fontawesome: Plugin = {
  install(app) {
    app.component("font-awesome-icon", FontAwesomeIcon);
  },
};
