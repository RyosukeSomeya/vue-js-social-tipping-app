import Vue from 'vue';
import Router from 'vue-router';
import Signup from './components/Siginup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/signup',
            name: 'signup',
            component: Signup
        },
        {
            path: '/dashboard/:id',
            name: 'dashboard',
            component: Dashboard,
            props: true
        },
    ]
})
