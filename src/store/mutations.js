export default {
    setUser(state, { uid, name }) {
        state.uid = uid;
        state.name = name;
    },
    setUserCoins(state, coins){
        state.coins = coins
    },
    setUsers(state, user){
        if (state.uid !== user.uid) {
            state.users.push(user);
        }
    },
    resetState(state) {
        state.uid = '';
        state.name = '';
        state.coins = 0;
        state.users = [];
    }
}
