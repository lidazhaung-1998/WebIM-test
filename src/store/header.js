const header = {
    state:{
        title:'登录',
        options:{
            icon:'cubeic-add',
            btns:[
                '添加好友',
                '申请入群',
                '创建群组',
            ]
        }
    },
    mutations:{
        changedTitle(state, payload) {
            state.title = payload;
        }
    }
}
export default header;