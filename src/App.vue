<template>
    <div id="app">
        <header>
            <appHead></appHead>
        </header>
        <main class="wrap">
            <transition name="route-move">
                <router-view class="route-view"/>
            </transition>
        </main>
        <footer v-if="$store.state.login.userInfo">
            <cube-tab-bar
                    :showSlider="true"
                    v-model="selectedLabelDefault"
                    :data="tabs"
                    @change="changeHandle"
            ></cube-tab-bar>
        </footer>
    </div>
</template>
<script>
    import appHead from './components/appHead/appHead';
    import WebIM from "./utils/WebIM";

    export default {
        created() {
            this.opened();
            this.$store.commit("changedTitle", this.$route.name);
        },
        mounted() {
        },
        computed: {},
        data() {
            return {
                selectedLabelDefault: "好友",
                tabs: [
                    {
                        label: "好友",
                        icon: "cubeic-game"
                    },
                    {
                        label: "群组",
                        icon: "cubeic-navigation"
                    },
                    {
                        label: "我的",
                        icon: "cubeic-person"
                    },
                ],
            };
        },
        watch: {
            $route(route) {
                this.selectedLabelDefault = route.name;
                localStorage.setItem("currPath", route.path);
                this.$store.commit("changedTitle", route.name);
            },
        },
        methods: {
            opened() {
                var storeStateLogin = this.$store.state.login.userInfo
                if (storeStateLogin) {
                    WebIM.conn.open({
                        apiUrl: WebIM.config.apiURL,
                        user: storeStateLogin.username,
                        accessToken: storeStateLogin.token,
                        appKey: WebIM.config.appkey,
                    });
                }
            },
            changeHandle(val) {
                this.$router.push({
                    name: val,
                    query: this.$route.query,
                });
            },
        },
        components: {
            appHead
        },
    };
</script>

<style lang="scss">
    #app {
        height: 100%;
        display: flex;
        flex-direction: column;

        .route-move-enter {
            transform: translate3d(-100%, 0, 0);
        }

        .route-move-to {
            transform: translate3d(100%, 0, 0);
        }

        .route-move-enter-active,
        .route-move-leave-active {
            transition: 0.5s;
        }

        .wrap {
            flex: 1;
            background-color: #191919;
            overflow: auto;
            position: relative;
        }

        .route-view {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            bottom: 0;
        }

        header {

        }

        footer {
            width: 100%;
            height: 1rem;
            background-color: rgba(29, 29, 29, 0.93);

            .cube-tab-bar {
                height: 100%;

                .cube-tab {
                    height: 100%;
                    font-size: 0.4rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;

                    div {
                        font-size: 0.25rem;
                    }
                }
            }
        }
    }
</style>
