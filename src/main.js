import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import {routes} from './routes/routes.js'
import vuetify from './plugins/vuetify'
import {store} from './store/store.js'
import axios from 'axios'
Vue.use(VueRouter);
Vue.config.productionTip = false

//axios.defaults.baseURL="https://adsi2067725v1.herokuapp.com/api/"
axios.defaults.baseURL="https://proyectosemilla.herokuapp.com/api/"
//axios.defaults.baseURL="https://localhost:27017/api/"

const router = new VueRouter({
  // en este bloque escribimos las rutas
  routes,                     
  mode:"history"
})

new Vue({
  render: h => h(App),
  axios,
  vuetify,
  router,
  store
}).$mount('#app')

// router.beforeEach((to, from, next) =>{
//   if (!store.state.token && to.path != "/login"){
//     next("/login");
//   }else{
//     next();
//   }
// })