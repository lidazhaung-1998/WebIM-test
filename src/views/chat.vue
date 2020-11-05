<template>
        <div>
            <transition name="chat-route-move">
                <router-view class="chat-route-view"/>
            </transition>
        </div>
</template>
<script>
    export default {
        name: "chat",
        created() {
        }
    }
</script>

<style lang="scss" scoped>
    .chat-route-move-enter {
        transform: translate3d(100%, 0, 0);
    }

    .chat-route-move-to {
        transform: translate3d(-100%, 0, 0);
    }

    .chat-route-move-enter-active,
    .chat-route-move-leave-active {
        transition: 0.5s;
    }


    .chat-route-view {
        position: absolute;
        top: 0;
        bottom: 0;
        z-index: 1;
        width: 100%;
        height: 100%;
        background-color: #191919;
        overflow: hidden;
        color: #fff;
    }
</style>