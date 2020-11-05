import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import router from './router'
import store from './store'
import "./assets/css/index.scss"
import WebIM from "./utils/WebIM";
Vue.config.productionTip = false
window.Vue = new Vue({
    router,
    store,
    WebIM,
    render: h => h(App)
}).$mount('#app')