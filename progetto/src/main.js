// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueMaterial from 'vue-material'
import router from './router'

import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';
//import "./Viewport.scss";

import DataService from './dataservice';

Vue.use(VueMaterial);

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if(to.name !== 'Login' && !DataService.isAuthenticated()) {
    next({name: 'Login'});
  } else {
    next();
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
