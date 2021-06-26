<template>
    <div class="columns is-centered">
        <div class="box column is-two-fifths mt-6">
            <h1 class="h1 mb-4 is-size-4">新規登録画面</h1>
            <form action="">
                <div class="field is-horizontal">
                    <div class="field-label is-normal">
                        <label for="username" class="label">ユーザー名：</label>
                    </div>
                    <div class="field-body">
                        <div class="field">
                            <div class="control">
                                <div class="is-fullwidth">
                                <input class="input" type="text" name="nusername" id="username">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="field is-horizontal">
                    <div class="field-label is-normal is-flex-wrap-nowrap">
                        <label for="email" class="label">メールアドレス：</label>
                    </div>
                    <div class="field-body">
                        <div class="field">
                            <div class="control is-expanded">
                                <div class="is-fullwidth">
                                <input class="input" type="email" name="email" id="email">
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
                                <input class="input" type="password" name="password" id="password">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="field">
                    <div class="control mb-4">
                        <input class="button is-primary" type="submit" value="ログイン">
                    </div>
                    <div class="control">
                        <router-link to="/">ログインはこちらから</router-link>
                    </div>
                </div>
            </form>

        </div>
    </div>
</template>

<style lang="scss">
    .field-label {
        flex-grow: 2;
    }
</style>