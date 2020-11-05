const login = {
    state: {
        userInfo: JSON.parse(localStorage.getItem('userInfo')) || '',
    },
    mutations: {
        setUserInfo(state, payload) {
            state.userInfo = payload;
            localStorage.setItem('userInfo', JSON.stringify(payload));
        },
    },
    actions: {}
}
export default login;