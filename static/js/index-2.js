import Vue from 'vue';
import Hello from 'hello';

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  template: '<App/>',
  components: {Hello},
});
