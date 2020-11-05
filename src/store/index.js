import Vue from 'vue'
import Vuex from 'vuex'
import Caht from "./chat"
import Login from "./login"
import Header from "./header"

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        chat: Caht,
        header: Header,
        login: Login,
    }
})