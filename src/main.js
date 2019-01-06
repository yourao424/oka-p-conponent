// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'
import jquery from 'jquery'
global.jquery = jquery
global.$ = jquery
window.$ = window.jquery = require('jquery')

Vue.config.productionTip = false
$.getJSON('/assets/firebase_config.json', function (data) {
  firebase.initializeApp(data.config)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
