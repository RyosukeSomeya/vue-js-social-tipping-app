import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from "./store";
import firebase from "firebase/app"; // 必須

Vue.config.productionTip = false;

// 外部ファイル化する
const firebaseConfig = {
  apiKey: "AIzaSyDy13ergZETQf5O-xtSBQ0i52tZODm5Oxw",
  authDomain: "vue-social-tipping-app-2a3fb.firebaseapp.com",
  projectId: "vue-social-tipping-app-2a3fb",
  storageBucket: "vue-social-tipping-app-2a3fb.appspot.com",
  messagingSenderId: "806461738822",
  appId: "1:806461738822:web:3594fc7417307f83201f47"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
