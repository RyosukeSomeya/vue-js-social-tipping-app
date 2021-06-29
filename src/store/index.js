import Vue from 'vue';
import Vuex from 'vuex';
// import router from '../router';
import firebase from "firebase/app";
import "firebase/auth";

Vue.use(Vuex);

export default new Vuex.Store({
    actions: {
        signup(commit, authData) {
            firebase.auth().createUserWithEmailAndPassword(authData.email, authData.password)
                .then((response) => {
                    response.user.updateProfile({
                        displayName: authData.username
                    }).then(() => {
                        // 確認用 ※レビュー後削除
                        const user = firebase.auth().currentUser;
                        alert(`登録完了しました。\n
                            名前: ${user.displayName}\n
                            email: ${user.email}\n`);
                        // router.push('/');
                    }).catch((error) => {
                        console.log(error)
                    });
                })
                .catch((error) => {
                    alert(`新規ユーザー登録に失敗しました。\n
                    Code: ${error.code}\n
                    Message: ${error.message}`, )
                });
        },
        login(commit, authData) {
            firebase.auth().signInWithEmailAndPassword(authData.email, authData.password)
                .then((response) => {
                    // 確認用 ※レビュー後削除
                    alert('ログインしました。', response.user.displayName);
                    // router.push('/');
                })
                .catch((error) => {
                    alert(`ログインに失敗しました。\n
                    Code: ${error.code}\n
                    Message: ${error.message}`, )
                });
        },
    },
});