const header = {
    state:{
        title:'登录',
    },
    mutations:{
        changedTitle(state, payload) {
            state.title = payload;
        }
    }
}
export default header;