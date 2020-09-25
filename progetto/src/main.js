//import dipendenze
import Vue from 'vue'
import App from './App'
import VueMaterial from 'vue-material'
import router from './router'
import VueGoogleCharts from 'vue-google-charts'

//importazione degli stili
import 'vue-material/dist/vue-material.min.css'
//tema personalizzato
import "./Viewport.scss";

//dataservice
import DataService from './dataservice';

//componenti
import Post from './components/Post';
import ScriviPost from './components/ScriviPost';
import Copertina from './components/Copertina';
import CardNumeri from './components/CardNumeri';
import TastoLista from './components/TastoLista';
import CardOsservati from './components/CardOsservati';
import CardPrevenzione from './components/CardPrevenzione'

Vue.component('post', Post);
Vue.component('scrivi-post', ScriviPost);
Vue.component('copertina', Copertina);
Vue.component('card-numeri', CardNumeri);
Vue.component('tasto-lista', TastoLista);
Vue.component('card-osservati', CardOsservati);
Vue.component('card-prevenzione', CardPrevenzione)

Vue.use(VueMaterial);
Vue.use(VueGoogleCharts);

Vue.config.productionTip = false

//se l'utente non ha mai effettuato l'accesso, allora viene reindirizzato alla pagina di login
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
  render: h => h(App)
})
