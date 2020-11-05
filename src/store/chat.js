const chat = {
    state: {
        msgList: {
            friendsList: [],
            groupList: []
        },
        friendsBlackObj: {},
    },

    mutations: {
        updateFriendsList(state, payload) {
            state.friendsList.unshift(payload);
        },
        updateFriendsBlackObj(state, payload) {
            state.friendsBlackObj.count = payload.count;
            if (payload.data) {
                state.friendsBlackObj.data = payload.data;
            }
        }
    },
    actions: {
        getUserFriendsList({commit, state}, payload) {
            var list = [],
                timer = null;
            const succ = function (res) {
                var array = [];
                if (Array.isArray(res)) {
                    array = res;
                } else {
                    array = res.data;
                }
                array.forEach((item) => {
                    WebIM.conn.fetchHistoryMessages({
                        queue: item.name || item.groupid,
                        isGroup: payload.isGroup,
                        count: payload.count,
                        success: function (msgArr) {
                            var tb = new Object();
                            if (msgArr.length != 0) {
                                var len = msgArr.length - 1;
                                tb.name = item.name;
                                msgArr.forEach(obj => {
                                    if (obj.from == payload.user) {
                                        obj.right = true;
                                    } else {
                                        obj.right = false;
                                    }
                                })
                                tb.time = Number(msgArr[len].time);
                                tb.data = msgArr;
                                tb.showLastMsg = msgArr[len].data;
                            } else {
                                tb.name = item.name;
                                tb.time = 0;
                                tb.data = [];
                                tb.showLastMsg = '';
                            }
                            list.push(tb);
                        }
                    });
                })
                timer = setInterval(() => {
                    if (list.length == array.length) {
                        clearInterval(timer);
                        state.msgList[payload.type] = list;
                    }
                }, 80)
            }
            if (payload.type == 'friendsList') {
                WebIM.conn.getRoster({
                    success: succ
                })
            } else {
                WebIM.conn.getGroup({
                    success: succ
                })
            }

        },
        getUserBlackList({commit}, payload) {
            WebIM.conn.getBlacklist({
                success: res => {
                    commit('updateFriendsBlackObj', {
                        data: res.data,
                        count: res.count
                    })
                }
            });
        },
    },
    getters: {
        getuserList(state) {
            return state.msgList.friendsList.sort((n, m) => {
                var a = n.time;
                var b = m.time;
                if (b > a) {
                    return 1;
                } else if (b == a) {
                    return 0;
                } else {
                    return -1;
                }
            });
        },
        getUserBlack(state) {
            return state.friendsBlackObj;
        },
        getUserGroupList(state) {
            return state.msgList.groupList;
        }
    }
}

export default chat;