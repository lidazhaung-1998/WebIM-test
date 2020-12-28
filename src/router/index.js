import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'
import Login from '../views/login'
import chat from '../views/chat'
import friends from '../components/friends/friends'

Vue.use(VueRouter)
const routes = [
    {
        path: '/',
        redirect: '/login',
    },
    {
        path: '/login',
        name: '登录',
        component: Login,
        meta: {
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
                path: 'talk',
                name: 'talkPage',
                component: () => import('../components/talk/talk'),
                meta: {
                    auth: true
                }
            },
            {
                path: 'friends',
                name: '好友',
                component: friends,
                meta: {
                    auth: true
                }
            },
            {
                path: 'group',
                name: '群组',
                component: () => import('../components/group/group'),
                meta: {
                    auth: true
                }
            },
            {
                path: 'me',
                name: '我的',
                component: () => import('../components/me/me'),
                meta: {
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
    var token = store.state.login.userInfo.token;
    if (to.meta.auth) {
        if (token) {
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
    } else {
        if (!token) {
            next();
        }
    }
})
export default router;