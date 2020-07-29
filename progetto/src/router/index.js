import Vue from 'vue'
import Router from 'vue-router'

import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'
import Profilo from '../pages/Profilo'
import Contagi from'../pages/Contagi'
import Osservati from'../pages/Osservati'
import Notfound from '../pages/Notfound'

Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [
    {name: 'Login', path: '/login', component: Login},
    {name: 'Dashboard', path: '/dashboard', component: Dashboard},
    {name: 'Profilo', path: '/profilo/:username', component: Profilo},
    {name: 'Contagi', path: '/contagi/:slug', component: Contagi},
    {name: 'Osservati', path: '/osservati', component: Osservati},
    {name: 'default', path: '/', redirect: '/dashboard'},
    {name: '404', path: '*', component: Notfound}
  ]
})
