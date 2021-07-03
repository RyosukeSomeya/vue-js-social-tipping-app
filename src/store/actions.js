import router from '../router';
import firebase from 'firebase/app';
import 'firebase/auth'; // 認証ユーザーを作成・管理
import 'firebase/firestore'; // ユーザーデータを作成・管理


export default {
    signup({ commit, dispatch }, authData) {
        firebase.auth().createUserWithEmailAndPassword(authData.email, authData.password)
            .then((userCredential) => {
                const user = userCredential.user;
                user.updateProfile({
                    displayName: authData.username
                }).then(() => {
                    // firestoreに残高管理用のデータを作成
                    firebase.firestore().collection('users').doc(user.uid).set({
                        uid: user.uid,
                        userName: user.displayName,
                        coin: 500
                    }).then(() => {
                        // stateにユーザー情報をセット
                        commit('setUser', {
                            uid: user.uid,
                            name: user.displayName,
                        });
                        dispatch('setUserCoins', user.uid);
                        dispatch('setUsersList');
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
                    dispatch('setUserCoins', user.uid);
                    dispatch('setUsersList');
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
            commit('resetAllState');
            // セッションストレージを削除
            window.sessionStorage.removeItem('vuex');
            router.push({ name: 'login' }).catch(() => {});
            alert('ログアウトしました');
        }).catch((error) => {
            alert(`ログアウトに失敗しました\n${error.message}`);
        });
    },
    setUserCoins({ commit }, uid) {
        const data = firebase.firestore().collection('users').doc(uid).get();
        data.then((doc) => {
            commit('setUserCoins', doc.data().coin);
        })
        .catch((error) => {
            alert(`コイン残高の取得に失敗しました。: ${error.message}`);
        });
    },
    setUsersList({ commit }) {
        const usersList = firebase.firestore().collection('users').get();
        usersList.then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                commit('setUsers', doc.data());
            });
        })
    },
    transfer({ commit, dispatch }, transferData) {
        const db = firebase.firestore().collection('users');
        const senderUser = firebase.auth().currentUser;
        const senderUserData = db.doc(senderUser.uid).get();
        const destinationData = db.doc(transferData.destinationUid).get();

        // 送り先DB内容変更
        destinationData.then((doc) => {
            let toUserCoin = null;
            if (doc.exists) {
                toUserCoin = doc.data().coin;
            }
            if (toUserCoin) {
                db.doc(transferData.destinationUid).update({
                    coin:  toUserCoin + Number(transferData.coin)
                }).then(() => {
                    // 送り先データのstateをupdate
                    commit('resetUsersList');
                    dispatch('setUsersList');

                    // 送り主DB内容変更
                    senderUserData.then((doc) => {
                        let currentUserCoin = null;
                        if (doc.exists) {
                            currentUserCoin = doc.data().coin;
                        }
                        if (currentUserCoin) {
                            db.doc(senderUser.uid).update({
                                coin:  currentUserCoin - Number(transferData.coin)
                            }).then(() => {
                                // 送り主データのstateをupdate
                                dispatch('setUserCoins', senderUser.uid);
                            }).catch((error) => {
                                alert(
                                    `送金は成功しましたが、あなたのデータにエラーが起きました。\n
                                    以下のメッセージを管理者までお問い合わせください。
                                    \n${error.message}`
                                );
                            });
                        }
                    }).catch((error) => {
                        alert(`送金に失敗しました。\n${error.message}`);
                    });
                });
            }
        });
    }
}
