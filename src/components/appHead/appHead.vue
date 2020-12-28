<template>
    <div class="head">
        <div class="iconBtn">
            <i class="icon"></i>
        </div>
        <div class="title">
            {{ $store.state.header.title }}
            <span class="title"></span>
        </div>
        <div class="optionBtn" @click="handleAddBtn">
            <div class="icon" :class="opt.icon"></div>
            <div class="wallTransparent" v-if="showOption" @click="handleFN">
                <div class="select">
                    <div class="btn" v-for="item in opt.btns">{{item}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "appHead",
        created() {
        },
        data() {
            return {
                showOption: false
            }
        },
        computed: {
            opt() {
                return this.$store.state.header.options;
            }
        },
        methods: {
            handleFN(ev) {
                ev.stopPropagation();
                this.showOption = false;
            },
            handleAddBtn() {
                this.showOption = true;
            }
        },
        components: {}
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

        .optionBtn {
            position: absolute;
            right: 0;
            padding: .2rem;
            color: #fff;
            font-size: 0.6rem;

            .icon {
                font-size: .55rem;
                color: #fff;
            }

            .wallTransparent {
                position: fixed;
                top: 0;
                right: 0;
                left: 0;
                bottom: 0;
                z-index: 2;
            }

            .select {
                position: absolute;
                right: .3rem;
                top: 1rem;
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