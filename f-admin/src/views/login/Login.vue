<template>
    <div class="login">

    <div class="form-box" v-loading="loading" element-loading-background="rgba(0, 0, 0, 0)">
        <div class="title">
            <h1 title="Fan">Fan</h1>
        </div>
    </div>
    </div>
</template>

<script>
export default {
    name: 'login',
    data() {
        return {
            loading: false, // 加载动画
            wait: 2000, // 2000ms之内不能重复发起请求
            throttleLogin: null, // 节流登录
            form: {
                nickname: 'super',
                password: '123456',
                confirm_password: '123456',
                email: '2285901508@qq.com',
            },
        }
    },
}
</script>

<style lang="scss">

</style>
