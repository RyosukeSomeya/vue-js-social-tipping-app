import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate'; // storeの保持
import router from '../router';
import firebase from 'firebase/app';
import 'firebase/auth'; // 認証ユーザーを作成・管理
import 'firebase/firestore'; // ユーザーデータを作成・管理

Vue.use(Vuex);

export default new Vuex.Store({
    plugins: [createPersistedState({storage: window.sessionStorage})],
    state: {
        uid: '',
        name: '',
        coins: 0,
    },
    getters: {
        name: state => state.name,
        userCoins: state => state.coins
    },
    mutations: {
        setUser(state, { uid, name }) {
            state.uid = uid;
            state.name = name;
        },
        setUserCoins(state, coins){
            state.coins = coins
        },
        resetState(state) {
            state.uid = ''
            state.name = ''
            state.coins = 0
        }
    },
    actions: {
        signup({ commit, dispatch }, authData) {
            firebase.auth().createUserWithEmailAndPassword(authData.email, authData.password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    user.updateProfile({
                        displayName: authData.username
                    }).then(() => {
                        // firestoreに残高管理用のデータを作成
                        firebase.firestore().collection('users').add({
                            uid: user.uid,
                            coin: 500
                        }).then(() => {
                            // stateにユーザー情報をセット
                            commit('setUser', {
                                uid: user.uid,
                                name: user.displayName,
                            });
                            dispatch('getUserCoins', user.uid);
                            router.push({
                                name: 'dashboard',
                                params: {
                                    id: user.uid,
                                }
                            });
                        })
                    }).catch((error) => {
                        alert(
                            `ユーザー名登録にに失敗しました。\n
                            Code: ${error.code}\n
                            Message: ${error.message}`
                        );
                    });
                })
                .catch((error) => {
                    alert(
                        `新規ユーザー登録に失敗しました。\n
                        Code: ${error.code}\n
                        Message: ${error.message}`
                    );
                });
        },
        login({ commit, dispatch }, authData) {
            firebase.auth().signInWithEmailAndPassword(authData.email, authData.password)
                .then((userCredential) => {
                    const user = userCredential.user
                    if (user) {
                        // stateにユーザー情報をセット
                        commit('setUser', {
                            uid: user.uid,
                            name: user.displayName
                        });
                        dispatch('getUserCoins', user.uid);
                        router.push({
                            name: 'dashboard',
                            params: {
                                id: user.uid,
                            }
                        });
                    } else {
                        alert('ログイン中のユーザー情報の取得に失敗しました。');
                    }
                })
                .catch((error) => {
                    alert(`ログインに失敗しました。\n
                        Code: ${error.code}\n
                        Message: ${error.message}`
                    );
                });
        },
        signout({ commit }) {
            firebase.auth().signOut().then(() => {
                commit('resetState')
                // セッションストレージを削除
                window.sessionStorage.removeItem('vuex');
                alert('ログアウトしました');
            }).catch((error) => {
                alert(`ログアウトに失敗しました\n${error.message}`);
            });
        },
        getUserCoins({ commit }, uid) {
            const data = firebase.firestore().collection('users').where('uid', '==', uid).get();
            data.then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    commit('setUserCoins', doc.data().coin);
                });
            })
            .catch((error) => {
                console.log('コイン残高の取得に失敗しました。: ', error);
            });
        },
    },
});
