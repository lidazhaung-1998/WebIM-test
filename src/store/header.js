const header = {
    state: {
        title: '登录',
        status: false,
        options: {
            icon: 'cubeic-add',
            btns: [
                {
                    txt: '添加好友',
                    id: 0
                },
                {
                    txt: '申请入群',
                    id: 1
                }
            ]
        }
    },
    mutations: {
        changedTitle(state, payload) {
            state.title = payload;
        },
        changeStatus(state, pay) {
            state.status = pay;
        }
    }
}
export default header;