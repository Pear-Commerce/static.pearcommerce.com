import Vue from 'vue';
import VueMeta from 'vue-meta';
import VueRouter from 'vue-router';

Vue.config.productionTip = true;

Vue.use(VueRouter);
Vue.use(VueMeta, {
  // optional pluginOptions
  refreshOnceOnNavigation: true,
});

Vue.config.ignoredElements = [/^rs-/];

const routes = [
  {path: '/', component: require('components/chrome'),
    children: [
      {
        path: '/',
        component: require('components/home'),
      },
      {
        path: 'hello',
        component: require('components/hello'),
      },
    ],
  },
];

const router = new VueRouter({
  routes: routes,
  mode: 'history',
});

const app = new Vue({

  router,

}).$mount('#app');

console.log(app);
