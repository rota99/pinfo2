import Vue from 'vue'
import Router from 'vue-router'

import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'
import Profilo from '../pages/Profilo'

Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [
    {name: 'Login', path: '/login', component: Login},
    {name: 'Dashboard', path: '/', component: Dashboard},
    {name: 'Profilo', path: '/pokemon/:username', component: Profilo}
  ]
})
