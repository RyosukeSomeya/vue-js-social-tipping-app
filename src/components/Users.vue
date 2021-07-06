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
                            <td class="is-size-4 has-text-weight-bold">{{ user.userName }}</td>
                            <td><button class="button is-primary" @click="showWallet(user)">walletを見る</button></td>
                            <td><button class="button is-primary" @click="showTransferPanel(user)">送る</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <!-- 残高確認モーダル -->
        <div v-if="walletIsShow">
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
        <!-- 送金モーダル -->
        <div v-if="transferPanelIsShow">
            <div class="modal is-active">
                <div class="modal-background"></div>
                <div class="modal-card">
                    <header class="modal-card-head">
                    <p class="modal-card-title">Money Transfer</p>
                    </header>
                    <section class="modal-card-body">
                        <p class="is-size-4">あなたの残高</p>
                        <p class="is-size-4">{{ userCoins }}コイン</p>
                        <div class="field columns is-horizontal ">
                            <div class="field-body column">
                                <div class="field">
                                    <div class="control is-flex is-justify-content-center	">
                                        <div class="input-half">
                                            <input class="input" type="number" v-model="transferCoin">
                                        </div>
                                        <button class="is-flex-grow-0 field-label button is-primary ml-4" @click="transfer">送金</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <footer class="modal-card-foot">
                    <button class="button is-danger" @click="closeTransferPanel">Close</button>
                    </footer>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    props: ['userCoins'],
    data() {
        return {
            walletIsShow: false,
            transferPanelIsShow: false,
            modalUserName: '',
            modalCoinAmount: 0,
            transferCoin: 0,
            destinationUid: '',
        }
    },
    computed: {
        ...mapGetters(['usersList']),
    },
    methods: {
        showWallet(user) {
            this.modalUserName = user.userName;
            this.modalCoinAmount = user.coin;
            this.walletIsShow = true;
    },
        closeWallet() {
            this.walletIsShow = false;
        },
        showTransferPanel(user) {
            this.transferPanelIsShow = true;
            this.destinationUid = user.uid;
        },
        closeTransferPanel() {
            this.transferPanelIsShow = false;
            this.destinationUid = '';
        },
        transfer() {
            this.$store.dispatch('transfer', {
                coin: this.transferCoin,
                destinationUid: this.destinationUid,
            })
            this.transferCoin = 0;
            this.closeTransferPanel();
        }
    }
}
</script>

<style scoped>
    .input-half {
        width: 50%;
    }
</style>
