import Vue from 'vue';
import App from '../../hello.vue';

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  template: '<App/>',
  components: {App},
});
