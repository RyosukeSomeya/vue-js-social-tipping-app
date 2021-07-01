export default {
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
}
