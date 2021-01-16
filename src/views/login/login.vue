<template>
  <div class="login-container">
    <el-form ref="elForm" :model="elForm" :rules="rules" class="login-form" auto-complete="on" label-position="left">

      <div class="title-container">
        <h2 class="title">在线协作项目管理系统</h2>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="email"/>
        </span>
        <el-input
          ref="email"
          v-model="elForm.email"
          placeholder="邮箱"
          name="email"
          type="text"
          tabindex="1"
          auto-complete="off"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password"/>
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="elForm.password"
          :type="passwordType"
          placeholder="密码"
          name="password"
          tabindex="2"
          auto-complete="off"
          @keyup.enter.native="submitForm"
        />
      </el-form-item>
      <el-form-item prop="verificationCode" style="width: 100%;">
        <el-input placeholder="验证码" v-model="elForm.verificationCode"/>
        <span class="image-container">
          <el-image v-if="isRouterAlive" ref="verificationCodeImg" :src="verificationCodeURL"
                    @click="renewVerificationCode" title="看不清？换一张"/>
        </span>
      </el-form-item>
      <el-button :loading="loading" style="width:30%;" @click.native.prevent="submitForm">登录</el-button>
      <el-button :loading="loading" style="width:30%;" @click.native.prevent="register">注册</el-button>
    </el-form>
  </div>
</template>
<script>
export default {
  components: {},
  props: [],
  data() {
    const validateEmail = (rule, value, callback) => {
      const regex = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/g
      if (!regex.test(value)) {
        callback(new Error('邮箱格式错误！'))
      }
      callback()
    }
    const validatePassword = (rule, value, callback) => {
      const regex = /^[A-Za-z0-9$!?@#%^&]{6,20}$/g
      if (!regex.test(value)) {
        callback(new Error('密码只能由字母、数字、$、?、!、@、#、%、^、&构成,最少6位最高20位！'))
      } else {
        callback()
      }
    }
    const validateCode = (rule, value, callback) => {
      const regex = /^[a-z0-9]{4,8}$/g
      if (!regex.test(value)) {
        callback(new Error('验证码格式错误！'))
      }
      callback()
    }
    return {
      redirect: undefined,
      isRouterAlive: true,
      verificationCodeURL: "/api/verificationCode",
      elForm: {
        email: "",
        password: undefined,
        verificationCode: "",
      },
      rules: {
        email: [{
          required: true,
          trigger: 'blur',
          validator: validateEmail
        }],
        password: [{
          required: true,
          trigger: 'blur',
          validator: validatePassword
        }],
        verificationCode: [{
          required: true,
          trigger: 'blur',
          validator: validateCode
        }]
      },
      //提交锁
      loading: false,
      passwordType: 'password',
    }
  },
  computed: {},
  watch: {
    //????
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
    renewVerificationCode() {
      this.isRouterAlive = false;
      this.$nextTick(() => (this.isRouterAlive = true))
    },
    submitForm() {
      this.$refs['elForm'].validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('client/login', this.elForm).then(() => {
            // this.$router.push({ path: this.redirect || '/' })
            console.log("请求成功，准备跳转")
            this.$router.push({name: 'project_list'})
            this.loading = false
          }).catch((err) => {
            this.$message.error(err.message)
            this.renewVerificationCode();
            this.loading = false
          })
        } else {
          return false
        }
      })
    },
    register() {
      this.loading = true
      this.$router.push({name: 'register'})
      this.loading = false
    },
    resetForm() {
      this.$refs['elForm'].resetFields()
    }
  }
}
</script>
<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #ffffff;
$light_gray: #000000;
$cursor: #000000;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {

  .el-input {
    display: inline-block;
    height: 47px;
    width: 75%;

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

  .title_motto {
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: all 3s linear;
  }

  .title {
    color: #3e3e3e;
    font-size: 50px;
    font-family: "細明體-ExtB";
    //letter-spacing: 6px;
  }

  .motto {
    color: #ffffff;
    margin-top: 18px;
    font-size: 15px;
    letter-spacing: 6px;
  }

  .el-form-item {
    border: 1px solid #dcdcdc;
    background: #ffffff;
    border-radius: 5px;
    color: #000000;
  }
}
</style>

<style lang="scss" scoped>
$bg: #ffffff;
$dark_gray: #000000;
$light_gray: #000000;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .image-container {
    vertical-align: middle;
    width: 23%;
    display: inline-block;
  }

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 100px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #000000;
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
      margin: 0px auto 40px auto;
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

