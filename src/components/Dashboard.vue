<template>
    <div>
        <h1 class="is-size-3">DashBoard</h1>
        <div class="columns is-centered">
            <div class="is-outlined column is-two-thirds mt-6 columns">
                <p class="column is-size-5">
                    <span class="is-size-4 has-text-weight-bold">{{ name }}</span>
                    さんようこそ！！
                </p>
                <p class="card column is-size-5 has-background-primary has-text-white">
                    コイン残高：
                    <span class="is-size-4 has-text-weight-bold">{{ userCoins }}</span>
                    コイン
                </p>
            </div>
        </div>
        <div class="mt-6">
            <button class="button is-danger" @click="logout">ログアウト</button>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    props: ['id'],
    computed: {
        ...mapGetters(['name', 'userCoins']),
    },
    methods: {
        logout() {
            this.$store.dispatch('signout');
        },
    }
}
</script>
