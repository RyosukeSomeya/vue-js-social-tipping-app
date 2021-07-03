import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate'; // storeの保持
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

Vue.use(Vuex);

export default new Vuex.Store({
    plugins: [createPersistedState({storage: window.sessionStorage})],
    state: {
        uid: '',
        name: '',
        coins: 0,
        users: []
    },
    getters,
    mutations,
    actions,
});
