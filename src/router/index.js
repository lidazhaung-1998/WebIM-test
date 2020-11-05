import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'
import Login from '../views/login'
import chat from '../views/chat'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/login',
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
            title: "登录",
            logined: true
        },
    },
    {
        path: '/chat',
        name: 'chat',
        component: chat,
        meta: {
            auth: true,
        },
        children: [
            {
                path: 'friends',
                name: 'friendsList',
                component: () => import('../components/friends/friends'),
                meta: {
                    title: '好友',
                    auth: true
                }
            },
            {
                path: 'group',
                name: 'groupList',
                component: () => import('../components/group/group'),
                meta: {
                    title: '群组',
                    auth: true
                }
            },
            {
                path: 'me',
                name: 'meSettings',
                component: () => import('../components/me/me'),
                meta: {
                    title: '我的',
                    auth: true
                }
            }
        ]
    }
]

const router = new VueRouter({
    routes
})
router.beforeEach(function (to, from, next) {
    if (to.meta.title) {
        document.title = to.meta.title;
    } else {
        document.title = "";
    }
    if (to.meta.auth) {
        if (store.state.login.userInfo.token) {
            next();
        } else {
            router.push({
                path: '/login',
                query: {
                    redirect: to.path
                }
            })
            next();
        }
    }
    if (to.meta.logined) {
        if (!store.state.login.userInfo.token) {
            next();
        }
    }
})
export default router;