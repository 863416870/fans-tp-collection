<template>
    <div class="login-container">
        <div class="bg-area"/>
        <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on"
                 label-position="left">
            <div class="title-container">
                <h3 class="title">{{ navbarHeaderContent }}</h3>
            </div>
            <el-form-item prop="username">
                <span class="svg-container">
                  <svg-icon icon-class="user"/>
                </span>
                <el-input
                        ref="username"
                        v-model="loginForm.username"
                        placeholder="Username"
                        name="username"
                        type="text"
                        tabindex="1"
                        auto-complete="on"
                />
            </el-form-item>

            <el-form-item prop="password">
                <span class="svg-container">
                  <svg-icon icon-class="password"/>
                </span>
                <el-input
                        :key="passwordType"
                        ref="password"
                        v-model="loginForm.password"
                        :type="passwordType"
                        placeholder="Password"
                        name="password"
                        tabindex="2"
                        auto-complete="on"
                        @keyup.enter.native="handleLogin"
                />
                <span class="show-pwd" @click="showPwd">
                    <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"/>
                </span>
            </el-form-item>
            <el-button :loading="loading" type="primary" style="width:100%;margin-top:20px;"
                       @click.native.prevent="throttleLogin">登录
            </el-button>
        </el-form>
    </div>
</template>
<script>
    import {validUsername} from '@/utils/validate'
    import Utils from '@/utils/util'
    // import setting from '@/store/modules/settings'

    export default {
        name: 'Login',
        data() {
            const validateUsername = (rule, value, callback) => {
                if (!validUsername(value)) {
                    callback(new Error('请输入正确的用户名'))
                } else {
                    callback()
                }
            }
            const validatePassword = (rule, value, callback) => {
                if (value.length < 6) {
                    callback(new Error('密码不能少于6位'))
                } else {
                    callback()
                }
            }
            return {
                loginForm: {
                    username: 'JayChou',
                    password: '123456'
                },
                loginRules: {
                    username: [{required: true, trigger: 'blur', validator: validateUsername}],
                    password: [{required: true, trigger: 'blur', validator: validatePassword}]
                },
                navbarHeaderContent: '环境大数据平台',
                loading: false,
                passwordType: 'password',
                redirect: undefined,
                wait: 2000, // 2000ms之内不能重复发起请求
                throttleLogin: null // 节流登录
            }
        },
        watch: {
            $route: {
                handler: function (route) {
                    this.redirect = route.query && route.query.redirect
                },
                immediate: true
            }
        },
        created() {
            // 节流登录
            this.throttleLogin = Utils.throttle(this.handleLogin, this.wait)
        },
        methods: {
            showPwd() {
                if (this.passwordType === 'password') {
                    this.passwordType = ''
                } else {
                    this.passwordType = 'password'
                }
                this.$nextTick(() => {
                    this.$refs.password.focus()
                })
            },
            handleLogin() {
                // TODO 查数据库用户信息 --此处mock.js暂时模拟数据
                this.$refs.loginForm.validate(valid => {
                    if (valid) {
                        this.loading = true
                        // 在actions里封装了一个axios请求
                        // 在login页通过this.$store.dispatch提交data里的数据
                        this.$store.dispatch('user/login', this.loginForm).then(() => {
                            this.$router.push({path: this.redirect || '/'})
                            this.loading = false
                        }).catch(() => {
                            this.loading = false
                        })
                    } else {
                        console.log('error submit!!')
                        return false
                    }
                })
            }
        }
    }
</script>

<style lang="scss">
    /* 修复input 背景不协调 和光标变色 */
    /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

    $bg: #283443;
    $light_gray: #283443;
    $cursor: #283443;

    @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
        .login-container .el-input input {
            color: $cursor;
        }
    }

    /* reset element-ui css */
    .login-container {
        width: 100%;
        height: 100%;
        background-size: auto;

        .el-input {
            display: inline-block;
            height: 47px;
            width: 85%;

            input {
                background: transparent;
                border: 0px;
                -webkit-appearance: none;
                border-radius: 0px;
                padding: 12px 5px 12px 15px;
                color: $light_gray;
                height: 47px;
                caret-color: $cursor;

                &:-webkit-autofill {
                    box-shadow: 0 0 0px 1000px $bg inset !important;
                    -webkit-text-fill-color: $cursor !important;
                }
            }
        }

        .el-form-item {
            border: 1px solid rgba(255, 255, 255, 0.1);
            background: rgba(0, 0, 0, 0.1);
            border-radius: 5px;
            color: #454545;
        }
    }
</style>

<style lang="scss" scoped>
    $bg: #ffffff;
    $dark_gray: #889aa4;
    $light_gray: #5eb8dd;

    .login-container {
        min-height: 100%;
        width: 100%;
        background-color: $bg;
        overflow: hidden;
        position: relative;

        .bg-area {
            width: 100%;
            height: 100%;
            position: absolute;
            filter: blur(10px);
            z-index: 10;
            background-image: url(./../../assets/img/login/thfw.jpeg);
            background-repeat: no-repeat;
            background-size: 100% 100%;
        }

        .login-form {
            background: #fff;
            width: 400px;
            position: absolute;
            left: calc(50% - 200px);
            top: calc(50% - 185px);
            border-radius: 4px;
            padding: 35px;
            z-index: 20;
        }

        .tips {
            font-size: 14px;
            color: #fff;
            margin-bottom: 10px;

            span {
                &:first-of-type {
                    margin-right: 16px;
                }
            }
        }

        .svg-container {
            padding: 6px 5px 6px 15px;
            color: $dark_gray;
            vertical-align: middle;
            width: 30px;
            display: inline-block;
        }

        .title-container {
            position: relative;

            .title {
                font-size: 26px;
                color: $light_gray;
                margin: 0px auto 30px auto;
                text-align: center;
                font-weight: bold;
            }
        }

        .show-pwd {
            position: absolute;
            right: 10px;
            top: 7px;
            font-size: 16px;
            color: $dark_gray;
            cursor: pointer;
            user-select: none;
        }
    }
</style>
