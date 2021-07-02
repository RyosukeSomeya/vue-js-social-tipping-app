import Vue from 'vue';
import Router from 'vue-router';
import Signup from './components/Siginup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import firebase from 'firebase/app';
import 'firebase/auth';

// const { isNavigationFailure, NavigationFailureType } = Router;

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/login',
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
            beforeEnter: (to, from, next) => {
                firebase.auth().onAuthStateChanged(function (user) {
                    if (!user) {
                        next();
                    } else {
                        // 認証されている場合、ダッシュボードへ
                        next({ name: 'dashboard', params: {id: user.uid} })
                    }
                })
            }
        },
        {
            path: '/signup',
            name: 'signup',
            component: Signup,
            beforeEnter: (to, from, next) => {
                firebase.auth().onAuthStateChanged(function (user) {
                    if (!user) {
                        next();
                    } else {
                        // 認証されている場合、ダッシュボードへ
                        next({ name: 'dashboard', params: {id: user.uid} })
                    }
                })
            }
        },
        {
            path: '/dashboard/:id',
            name: 'dashboard',
            component: Dashboard,
            props: true,
            beforeEnter: (to, from, next) => {
                firebase.auth().onAuthStateChanged(function (user) {
                    if (user) {
                        next();
                    } else {
                        // 認証されていない場合、認証画面へ
                        next({ name: 'login' });
                    }
                })
            }
        },
        {
            path: '*', // 存在しないpathへのアクセス対策
            redirect: '/login',
        }
    ]
});

