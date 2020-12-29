<template>
    <div class="head">
        <div class="iconBtn">
            <span class="icon"></span>
        </div>
        <div class="title">
            {{ $store.state.header.title }}
            <span class="title"></span>
        </div>
        <div class="optionBtn">
            <div class="icon" :class="opt.icon" @click="handleAddBtn" v-show="$store.state.header.status"></div>
            <div class="wallTransparent" v-show="showOption" @click="handleFN">
                <div class="select">
                    <div class="btn" v-for="item in opt.btns" @click="clickOption($event,item.id)">{{item.txt}}</div>
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
                showOption: false,
                val: '',
                dialogT: '',
                dialogP: ''
            }
        },
        computed: {
            opt() {
                return this.$store.state.header.options;
            }
        },
        methods: {
            hideOPtion() {
                this.showOption = false;
            },
            clickOption(ev, id) {
                ev.stopPropagation();
                this.hideOPtion();
                if (id === 0) {
                    this.dialogT = '添加好友';
                    this.dialogP = '用户名';
                    this.confirm = (e, v) => {
                        console.log(v);
                        WebIM.conn.addContact(v, '');
                    };
                }
                if (id === 1) {
                    this.dialogT = '申请入群';
                    this.dialogP = '群组ID';
                    this.confirm = (e, v) => {
                        console.log(v)
                    };
                }
                this.dialog();
            },
            dialog() {
                this.$createDialog({
                    type: 'prompt',
                    title: this.dialogT,
                    showClose: true,
                    maskClosable: true,
                    prompt: {
                        value: this.val,
                        placeholder: this.dialogP,
                        autofocus: true
                    },
                    onConfirm: this.confirm,
                    onCancel: () => {
                        this.val = '';
                    }
                }).show();
            },
            handleFN(ev) {
                ev.stopPropagation();
                this.hideOPtion();
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