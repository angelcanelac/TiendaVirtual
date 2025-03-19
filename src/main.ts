import "@mdi/font/css/materialdesignicons.css";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "font-awesome/css/font-awesome.min.css";
import "vuetify/styles";

import { createApp } from "vue";
import { createPinia } from "pinia";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { aliases, md } from "vuetify/iconsets/md";
import { createVuetify } from "vuetify";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);
const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      md,
    },
  },
});

app.use(createPinia());
app.use(router);
app.use(vuetify);

app.mount("#app");
