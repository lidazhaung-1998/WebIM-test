<template>
    <div class="LIST_BOX">
        <cube-scroll ref="scroll" :options="options" @pulling-down="onPullingDown" :data="finalList">
            <ul class="list">
                <li class="item" v-for="item in finalList" :key="item.name || item.groupname">
                    <div class="infoWrap">
                        <div class="userHead">
                            <div class="head"></div>
                        </div>
                        <div class="userContent">
                            <div class="userContainer">
                                <div class="context">
                                    <div class="userNameWrap">
                                        <span class="userName">{{ item.name || item.groupname }}</span>
                                    </div>
                                    <div class="messageDate">
                                        <span class="messageTime">{{ translateTime('yyyy-MM-dd hh:mm:ss',item.time) }}</span>
                                    </div>
                                </div>

                                <div class="lastMessageWrap">
                                    <p class="lastMessageText">
                                        {{ item.showLastMsg }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </cube-scroll>
    </div>
    <!--    jid.clientResource-->
</template>

<script>
    import timeFormat from "../../utils/timeFormat";

    export default {
        name: "listBox",
        props: ['list'],
        created() {
        },
        data() {
            return {
                items: [],
                options: {
                    scrollbar: true,
                    fade: true,
                    pullDownRefresh: {
                        threshold: 80,
                        txt: '刷新成功'
                    }
                }
            };
        },
        computed: {
            finalList() {
                return this.list
            }
        },
        methods: {
            translateTime(type, time) {
                if (time) {
                    return timeFormat(type, time);
                }
                return '';
            },
            onPullingDown() {
                this.$emit('refreshList', this.$refs.scroll.forceUpdate);
            }
        },
    };
</script>

<style lang="scss">
    .LIST_BOX {
        height: 100%;

        .list {
            .item {
                height: 1.43rem;
                border-bottom: 0.01rem solid #232323;
                padding: 0 0.32rem;
                box-sizing: border-box;

                .infoWrap {
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;

                    .userHead {
                        padding-right: 0.25rem;

                        .head {
                            width: 0.96rem;
                            height: 0.96rem;
                            background-size: 100% 100%;
                            background-image: url("../../assets/img/smr.jpg");
                        }
                    }

                    .userContent {
                        flex: 1;
                        height: 100%;

                        .userContainer {
                            height: 100%;
                            display: flex;
                            justify-content: space-evenly;
                            flex-direction: column;
                            font-size: 0;

                            .context {
                                display: flex;
                                justify-content: space-between;
                                align-items: center;

                                .userNameWrap {
                                    .userName {
                                        font-size: 0.31rem;
                                        color: #d7d7d7;
                                    }
                                }

                                .messageDate {
                                    .messageTime {
                                        font-size: 0.24rem;
                                        color: #c1c1c1;
                                    }
                                }
                            }

                            .lastMessageWrap {
                                .lastMessageText {
                                    width: 5.6rem;
                                    overflow: hidden;
                                    white-space: nowrap;
                                    text-overflow: ellipsis;
                                    font-size: 0.24rem;
                                    color: #626262;
                                }
                            }
                        }
                    }
                }
            }
        }

        .cube-scroll-wrapper {
            .cube-pulldown {
                .cube-pulldown-wrapper {
                    .cube-pulldown-loaded {
                        font-size: .26rem;
                    }
                }

            }

        }

    }

</style>
