<template>
    <div class="head">
        <div class="iconBtn">
            <i class="icon"></i>
        </div>
        <div class="title">
            {{ $store.state.header.title }}
            <span class="title"></span>
        </div>
        <div class="addBtn" @click="handleAddBtn">
            <div class="icon"></div>
            <div class="select" v-if="showAddSelect">
                <div class="btn">添加好友</div>
                <div class="btn">申请入群</div>
                <div class="btn">创建群组</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "header",
        data() {
            return {
                showAddSelect: false
            }
        },
        methods: {
            handleAddBtn() {
                this.showAddSelect = true;
            },
        }
    }
</script>

<style lang="scss" scoped>
    .head {
        box-sizing: border-box;
        width: 100%;
        height: 1.1rem;
        background-color: #111111;
        display: flex;
        align-items: center;

        .iconBtn {
            position: relative;
            padding: 0.2rem;

            .icon {
                display: block;
                font-size: .55rem;
                font-weight: 100;
                color: #fff;
            }

        }

        .title {
            line-height: 1.1rem;
            font-size: 0.32rem;
            color: #d2d2d2;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
        }

        .addBtn {
            position: absolute;
            right: 0;
            padding: .2rem;

            .icon {
                font-size: .55rem;
                color: #fff;
            }

            .select {
                position: absolute;
                z-index: 1;
                right: .3rem;
                top: .8rem;
                background-color: #fff;
                border-radius: .15rem;

                .btn {
                    font-size: .26rem;
                    color: #333333;
                    white-space: nowrap;
                    padding: .2rem;
                }
            }
        }

    }
</style>