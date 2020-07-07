import Vue from 'vue'
import Router from 'vue-router'

import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'
import Profilo from '../pages/Profilo'
import ModificaProfilo from'../pages/ModificaProfilo'
import Contagi from'../pages/Contagi'

Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [
    {name: 'Login', path: '/login', component: Login},
    {name: 'Dashboard', path: '/dashboard', component: Dashboard},
    {name: 'Profilo', path: '/profilo/:username', component: Profilo},
    {name: 'ModificaProfilo', path: '/modifica_profilo/:username', component: ModificaProfilo},
    {name: 'Contagi', path: '/contagi', component: Contagi},
    {name: 'default', path: '/', redirect: '/dashboard'}

  ]
})
