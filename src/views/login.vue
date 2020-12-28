<template>
    <div>
        <cube-form class="form" :model="model" :schema="schema" @validate="validateHandle"
                   @submit="submitHandle"></cube-form>
        <div class="switchLoginRegister">
            <div>{{isRegister ? '已有账号？' : '还没账号？'}}快去<a @click="loginOrRegisterClickHandle" class="click">{{ isRegister
                ? '登录' : '注册'
                }}</a></div>
        </div>
    </div>
</template>

<script>

    import Base64 from '../utils/base';

    export default {
        mounted() {

        },
        computed: {},
        data() {
            return {
                isRegister: false,
                isInputSure: false,
                model: {
                    username: '',
                    password: '',
                    nickname: ''
                },
                schema: {
                    fields: [
                        {
                            type: 'input',
                            modelKey: 'username',
                            label: '用户名',
                            props: {
                                placeholder: '用户名',
                                id: "input"
                            },
                            rules: {
                                required: true,
                                min: 1
                            },
                            messages: {
                                required: '用户名必填'
                            }
                        },
                        {
                            type: 'input',
                            modelKey: 'password',
                            label: '密码',
                            props: {
                                type: 'password',
                                placeholder: '请填写密码',
                                id: 'input'
                            },
                            rules: {
                                required: true,
                                min: 1
                            },
                            messages: {
                                required: '密码不能是空'
                            }
                        },
                        {
                            type: 'submit',
                            label: '登录',
                            props: {
                                disabled: true,
                            }
                        }
                    ]
                }
            }
        },
        methods: {
            validateHandle(result) {
                if (result.valid) {
                    this.isInputSure = result.valid;
                    this.isCanLogin('submit', 'props,disabled', false);
                } else {
                    this.isCanLogin('submit', 'props,disabled', true);
                }
            },
            isCanLogin(searchattr, setattr, valid) {
                var schema = this.schema;
                var VUE = this;
                for (var s in schema) {
                    if (Array.isArray(schema[s])) {
                        schema[s].forEach(function (item, index) {
                            if (item.type === searchattr) {
                                var p = setattr.split(',');
                                var f = p[0],
                                    h = p[1];
                                if (p.length > 1) {
                                    VUE.$set(item[f], h, valid);
                                    return;
                                }
                                VUE.$set(item, f, valid);
                            }
                        })
                    }
                }
            },
            loginOrRegisterClickHandle() {
                if (!this.isRegister) {
                    this.switchState().Register.call(this);
                } else {
                    this.switchState().Login.call(this);
                }
            },
            switchState() {
                var schema = this.schema;
                var fields = schema.fields;
                return {
                    Register: function () {
                        var nickName = {
                            type: 'input',
                            modelKey: 'nickname',
                            label: '昵称',
                            props: {
                                placeholder: '昵称',
                                id: 'input'
                            },
                            rules: {
                                required: true,
                            },
                            messages: {
                                required: '昵称不能是空'
                            }
                        }
                        for (var s in this.model) {
                            this.$set(this.model, s, '');
                        }
                        this.isCanLogin('submit', 'label', '注册');
                        this.isCanLogin('submit', 'props,disabled', true);
                        fields.splice(fields.length - 1, 0, nickName);
                        this.isRegister = !this.isRegister;
                    },
                    Login: function () {
                        this.isCanLogin('submit', 'label', '登录');
                        fields.splice(fields.length - 2, 1);
                        this.isRegister = !this.isRegister;
                    }
                }

            },
            submitHandle(ev) {
                ev.preventDefault();
                var VUE = this;
                var conn = WebIM.conn;
                if (this.isRegister) {  // 是注册
                    var registerOptions = {
                        username: this.model.username,
                        password: this.model.password,
                        nickname: this.model.nickname,
                        appKey: WebIM.config.appkey,
                        apiUrl: WebIM.config.apiURL,
                        success: this.registerSuccess,
                        error: this.registerError
                    }
                    conn.registerUser(registerOptions);
                } else {          // 是登录
                    var loginOptions = {
                        apiUrl: WebIM.config.apiURL,
                        user: this.model.username,
                        pwd: this.model.password,
                        appKey: WebIM.config.appkey,
                        success: this.loginSuccess
                    };
                    conn.open(loginOptions);
                }

            },
            loginSuccess(res) {
                let {username, password} = this.model;
                var base64 = new Base64();
                var bpassword = base64.encode(password);
                this.$store.commit('setUserInfo', {
                    'username': username,
                    'password': bpassword,
                    'token': res.access_token
                });
                this.$parent.opened();
            },
            registerSuccess(res) {
                this.switchState().Login.call(this);
                var VUE = this;
                setTimeout(function () {
                    VUE.isCanLogin('submit', 'props,disabled', false);
                }, 0)
            },
            registerError(err) {
                var errMsg = JSON.parse(err.data);
                if (errMsg.error === 'duplicate_unique_property_exists') {
                    // 用户名重复
                    this.$createToast({
                        txt: "用户名重复",
                        time: 1500,
                        type: 'error'
                    }).show();
                }
            },

        }
    }
</script>

<style lang="scss">
    .route-view {
        background-color: #121212;
    }

    .form {
        width: 100%;
        margin-top: 50%;
        background-color: #121212;

        .cube-form-group {
            width: 100%;
        }

        .cube-form-item {
            min-height: .88rem;

            .cube-form-label {
                color: #c2c2c2;
                font-size: .33rem;

                &::before {
                    content: "";
                }
            }

            .cube-form-group-content {
                position: relative;

                &::after {
                    content: "";
                    display: block;
                    width: 91%;
                    position: absolute;
                    bottom: 0;
                    left: 50%;
                    margin-left: -45%;
                    border-bottom: 1px solid #272727;
                }
            }

            .cube-input {
                background-color: transparent;
            }

            #input {
                width: 3.2rem;
                height: 0.35rem;
                background-color: transparent;
                border-radius: .1rem;
            }

            #input::placeholder {
                font-size: .33rem;
                color: #5c5c5c;
            }

            .cube-btn {
                background-color: #58c06b;
            }

            .cube-btn_disabled {
                background-color: #242424;
            }
        }
    }

    .switchLoginRegister {
        font-size: .28rem;
        color: #c2c2c2;
        text-align: center;

        .click {
            color: #8496ae;
            font-size: .28rem;
            padding: .2rem;
        }
    }

</style>