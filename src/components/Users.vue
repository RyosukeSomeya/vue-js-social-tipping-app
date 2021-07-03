<template>
    <div>
        <h1 class="is-size-3">ユーザー一覧</h1>
        <div class="columns">
            <div class="container column is-two-thirds">
                <table class="table is-fullwidth">
                    <thead class="">
                        <tr><th class="is-size-4 has-text-weight-bold">ユーザー名</th><th></th><th></th></tr>
                    </thead>
                    <tbody>
                        <tr v-for="user in usersList" :key="user.uid">
                            <td class="is-size-4 has-text-weight-bold">{{ user.userName }}</td><td><button class="button is-primary" @click="showWallet(user)">walletを見る</button></td><td><button class="button is-primary">送る</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div v-if="isShow">
            <div class="modal is-active">
                <div class="modal-background"></div>
                <div class="modal-card">
                    <header class="modal-card-head">
                    <p class="modal-card-title">Wallet</p>
                    </header>
                    <section class="modal-card-body">
                        <p class="is-size-4">{{ modalUserName }}さんの残高</p>
                        <p class="is-size-4">{{ modalCoinAmount }}コイン</p>
                    </section>
                    <footer class="modal-card-foot">
                    <button class="button is-danger" @click="closeWallet">Close</button>
                    </footer>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    data() {
        return {
            isShow: false,
            modalUserName: '',
            modalCoinAmount: 0,
        }
    },
    computed: {
        ...mapGetters(['usersList']),
    },
    methods: {
        showWallet(user) {
            this.modalUserName = user.userName;
            this.modalCoinAmount = user.coin;
            this.isShow = true;
        },
        closeWallet() {
            this.isShow = false;
        }
    }
}
</script>
