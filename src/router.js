import Vue from 'vue';
import Router from 'vue-router';
import Signup from './components/Siginup';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        // {
        //     path: '/',
        //     name: 'login',
        //     component: Login
        // },
        {
            path: '/signup',
            name: 'signup',
            component: Signup
        }
    ]
})