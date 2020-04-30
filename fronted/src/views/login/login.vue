<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">
      <div class="title-container">
        <h1 class="title">Chat Room</h1>
      </div>
      <el-form-item prop="username">
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="Username"
          name="username"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>
      <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
        <el-form-item prop="password">
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="Password"
            name="password"
            tabindex="2"
            autocomplete="on"
            @keyup.native="checkCapslock"
            @blur="capsTooltip = false"
            @keyup.enter.native="handleLogin"
          />
        </el-form-item>
      </el-tooltip>
      <el-button :loading="loading" type="success" style="width: 100%;margin-bottom: 20px;" @click.native.prevent="onLogin">登录</el-button>
      <el-button :loading="loading" type="primary" style="width: 100%;margin-left: 0px" @click.native.prevent="onRegister">注册</el-button>
    </el-form>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'Login',
  data () {
    const validateUsername = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {}
    }
  },
  methods: {
    ...mapActions([
      'handleLogin',
      'loadUserInfo'
    ]),
    checkCapslock (e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z')
    },
    onLogin () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.$Loading.show()
          const config = {
            url: '/login',
            data: this.loginForm
          }
          this.handleLogin(config).then(() => {
            this.$Loading.hide()
            this.$router.push({
              name: 'ChatRoom'
            })
          }).catch((err) => {
            this.$Loading.hide()
            console.log(err)
          })
        }
      })
    },
    onRegister () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.$Loading.show()
          const config = {
            url: '/register',
            data: this.loginForm
          }
          this.handleLogin(config).then(() => {
            this.$Loading.hide()
            this.onLogin()
          }).catch((err) => {
            this.$Loading.hide()
            console.log(err)
          })
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
@import './login.less';
</style>
