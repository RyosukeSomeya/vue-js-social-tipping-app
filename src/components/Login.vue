<template>
    <div class="columns is-centered">
        <div class="box column is-two-fifths mt-6">
            <h1 class="h1 mb-4 is-size-4">ログイン</h1>
            <div class="field is-horizontal">
                <div class="field-label is-normal is-flex-wrap-nowrap">
                    <label for="email" class="label">メールアドレス：</label>
                </div>
                <div class="field-body">
                    <div class="field">
                        <div class="control is-expanded">
                            <div class="is-fullwidth">
                            <input class="input" type="email" name="email" id="email" v-model="email">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="field is-horizontal">
                <div class="field-label is-normal">
                    <label for="password" class="label">パスワード：</label>
                </div>
                <div class="field-body">
                    <div class="field">
                        <div class="control">
                            <div class="is-fullwidth">
                            <input class="input" type="password" name="password" id="password" v-model="password">
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="field">
                <div class="control mb-4">
                    <input class="button is-primary" type="submit" value="ログイン" @click="login">
                </div>
                <div class="control">
                    <router-link to="/signup">新規登録はこちらから</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            email: '',
            password: '',
        };
    },
    methods: {
        login() {
            this.$store.dispatch('login', {
                email: this.email,
                password: this.password
            })
            this.email = '';
            this.password = '';
        }
    }
}
</script>

<style lang="scss">
    .field-label {
        flex-grow: 2;
    }
</style>