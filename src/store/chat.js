const chat = {
    state: {
        msgList: {
            friendsList: [],
            groupList: []
        },
        friendsBlackObj: {},
    },
    mutations: {
        addFriendsList(state, payload) {
            state.msgList[payload.type].push(payload.data);
        },
        updateFriendsListMsg(state, payload) {
            var list = state.msgList[payload.msgType];
            loop:for (var i = 0; i < list.length; i++) {
                var item = list[i];
                if ((item.name == payload.from || item.name == payload.to) || item.groupid == payload.to) {
                    item.showLastMsg = payload.showLastMsg;
                    item.time = payload.time;
                    item.data.unshift(payload.messageContext);
                    break loop;
                }
            }
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
            let store = state;
            const succ = function (res) {
                var array = [];
                if (Array.isArray(res)) {
                    array = res;
                } else {
                    array = res.data;
                }
                array.forEach((item, i) => {
                    WebIM.conn.fetchHistoryMessages({
                        queue: item.name || item.groupid,
                        isGroup: payload.isGroup,
                        count: payload.count,
                        success: function (msgArr) {
                            var tb = new Object();
                            tb.groupid = item.groupid;
                            payload.isGroup ? (tb.msgType = "groupList") : (tb.msgType = "friendsList");
                            if (msgArr.length != 0) {
                                var len = msgArr.length - 1;
                                tb.name = item.name || item.groupname;
                                tb.time = Number(msgArr[len].time);
                                tb.data = msgArr;
                                tb.showLastMsg = msgArr[len].data;
                            } else {
                                tb.name = item.name || item.groupname;
                                tb.time = 0;
                                tb.data = [];
                                tb.showLastMsg = '';
                                tb.right = false;
                            }
                            commit('addFriendsList', {type: payload.type, data: tb});
                            list.push(tb);
                        }
                    });
                })
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
            return state.msgList.friendsList.sort(mySort);
        },
        getUserBlack(state) {
            return state.friendsBlackObj;
        },
        getUserGroupList(state) {
            return state.msgList.groupList.sort(mySort);
        }
    }
}

function mySort(n, m) {
    var a = n.time;
    var b = m.time;
    if (b > a) {
        return 1;
    } else if (b == a) {
        return 0;
    } else {
        return -1;
    }
}

export default chat;