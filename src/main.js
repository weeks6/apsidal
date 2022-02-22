import { createApp } from 'vue';
import App from './App.vue';
import { Quasar } from 'quasar';
import routes from './routes';
import * as VueRouter from 'vue-router';

// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css';

// Import Quasar css
import 'quasar/src/css/index.sass';
import initFirabase from './firebase';

const app = createApp(App);

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes
});

const firebase = initFirabase();

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  if (requiresAuth && !(await firebase.getCurrentUser())) {
    next('login');
  } else {
    next();
  }
});

app.use(Quasar, {
  plugins: {} // import Quasar plugins and add here
});

app.use(router);

app.mount('#app');
