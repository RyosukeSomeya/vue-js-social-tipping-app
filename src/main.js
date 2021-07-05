import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import firebase from 'firebase/app'; // 必須
import { firebaseConfig } from './firebase.config'

Vue.config.productionTip = false;

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// 認証の永続性をセッションに合わせる
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
