// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'core-js/es6/promise'
import 'core-js/es6/string'
import 'core-js/es7/array'
// import cssVars from 'css-vars-ponyfill'
import Vue from 'vue'

import VueResource from 'vue-resource'
Vue.use(VueResource)

require('dotenv').config()
//// To Remove CORS ERROR
Vue.http.headers.common['Access-Control-Allow-Origin'] = '*'
Vue.http.headers.common['Content-Type'] = 'application/x-www-form-urlencoded'
Vue.http.headers.common['Accept'] = 'application/json, text/plain, */*'
Vue.http.headers.common['Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, Authorization, Access-Control-Allow-Origin'

import BootstrapVue from 'bootstrap-vue'
import VueProgressBar from 'vue-progressbar'
const options = {
  color: '#bffaf3',
  failedColor: '#874b4b',
  thickness: '5px',
  transition: {
    speed: '0.2s',
    opacity: '0.6s',
    termination: 300
  },
  autoRevert: true,
  location: 'left',
  inverse: false
}

Vue.use(VueProgressBar, options)
import App from './App'

import router from './router'
require('./bootstrap');

window.Vue = require('vue');


Vue.config.productionTip = false


import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
Vue.use(VueSweetalert2);

import VueRouter from 'vue-router';
Vue.use(VueRouter);

import Underscore from 'vue-underscore';
Vue.use(Underscore);
import VeeValidate from "vee-validate";
Vue.use(VeeValidate);

// todo
// cssVars()

Vue.use(BootstrapVue)


import "./Services/filters-directives";
require("./Services/filters-directives");

import "./Services/progress-bar";

import services from './Services/apiServices';

import { ApiCollections } from './config/config';
Vue.use(ApiCollections);

import store from "./store";
import Axios from 'axios';

if (store && store.getters.getToken && store.getters.getToken) {
  Axios.defaults.headers.common['Authorization'] = store.getters.getTokenType + " " + store.getters.getToken;
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  services,
  template: '<App/>',
  components: {
    App
  },
  data() {
    return {
      user: "Test"
    }
  },
})
