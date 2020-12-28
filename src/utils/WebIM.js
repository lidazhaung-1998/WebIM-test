import config from "./WebIMConfig";
import websdk from "easemob-websdk";
import emedia from "easemob-emedia";
import webrtc from "easemob-webrtc";

function ack(message) {
    var bodyId = message.id; // 需要发送已读回执的消息id
    var msg = new WebIM.message("read", WebIM.conn.getUniqueId());
    msg.set({
        id: bodyId,
        to: message.from
    });
    WebIM.conn.send(msg.body);
}

// 初始化IM SDK
var WebIM = {};
WebIM = window.WebIM = websdk;
WebIM.config = config;
WebIM.conn = new WebIM.connection({
    appKey: WebIM.config.appkey,
    isHttpDNS: WebIM.config.isHttpDNS,
    isMultiLoginSessions: WebIM.config.isMultiLoginSessions,
    https: WebIM.config.https,
    url: WebIM.config.xmppURL,
    apiUrl: WebIM.config.apiURL,
    isAutoLogin: true,
    heartBeatWait: WebIM.config.heartBeatWait,
    autoReconnectNumMax: WebIM.config.autoReconnectNumMax,
    autoReconnectInterval: WebIM.config.autoReconnectInterval,
    isStropheLog: WebIM.config.isStropheLog,
    delivery: WebIM.config.delivery
});
if (!WebIM.conn.apiUrl) {
    WebIM.conn.apiUrl = WebIM.config.apiURL;
}

// 注册监听回调
WebIM.conn.listen({
    onOpened: function (message) { // 连接成功回调
        // 登录或注册成功后 跳转到好友页面
        var redirect = Vue.$route.query.redirect || localStorage.getItem('currPath') || '/chat/friends';
        var path = `${redirect}?user=${WebIM.conn.user}`;
        redirect !== Vue.$route.path && Vue.$router.push(path);
    },
    onClosed: function (message) {

    }, // 连接关闭回调
    onTextMessage: function (message) {
        console.log(message);
        var tb = {
            from: message.from,
            to: message.to,
            time: Number(message.time),
            messageContext: message,
            showLastMsg: message.data
        }
        if (message.type === "groupchat") {
            tb.msgType = "groupList";
        } else if (message.type === "chat") {
            tb.msgType = "friendsList";
        }
        Vue.$store.commit('updateFriendsListMsg', tb)
    }, // 收到文本消息
    onEmojiMessage: function (message) {
        console.log(message)
    }, // 收到表情消息
    onPictureMessage: function (message) {
        console.log(message)
    }, // 收到图片消息
    onCmdMessage: function (message) {
        console.log(message)
    }, // 收到命令消息
    onAudioMessage: function (message) {
        console.log(message)
    }, // 收到音频消息
    onLocationMessage: function (message) {

    }, // 收到位置消息
    onFileMessage: function (message) {

    }, // 收到文件消息
    onVideoMessage: function (message) {

    }, // 收到视频消息
    onPresence: function (message) {


    }, // 处理“广播”或“发布-订阅”消息，如联系人订阅请求、处理群组、聊天室被踢解散等消息
    onRoster: function (message) {

    }, // 处理好友申请
    onInviteMessage: function (message) {

    }, // 处理群组邀请
    onOnline: function () {

    }, // 本机网络连接成功
    onOffline: function () {

    }, // 本机网络掉线
    onError: function (message) {

        // 报错返回到登录页面
        // Vue.$router.push({ path: '/login' });
    }, // 失败回调
    onRecallMessage: message => {

    },
    onBlacklistUpdate: function (list) { // 黑名单变动
        // 查询黑名单，将好友拉黑，将好友从黑名单移除都会回调这个函数，list则是黑名单现有的所有好友信息
        // 更新好友黑名单

    },
    onReceivedMessage: function (message) {

    }, // 收到消息送达服务器回执

    onDeliveredMessage: function (message) {

    }, // 收到消息送达客户端回执

    onReadMessage: function (message) {

    }, // 收到消息已读回执

    onCreateGroup: function (message) {

    }, // 创建群组成功回执（需调用createGroupNew）
    onMutedMessage: function (message) {

    } // 如果用户在A群组被禁言，在A群发消息会走这个回调并且消息不会传递给群其它成员
});

WebIM.WebRTC = webrtc;
WebIM.EMedia = emedia;
export default WebIM;
