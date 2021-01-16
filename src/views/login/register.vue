<template>
  <el-container>
    <el-container>
      <el-main>
        <el-card>
          <el-form :model="elForm" :rules="rules" ref="elForm">
            <!--
              name是password和name则会自动填充
              prop是对应rules中的验证规则
              v-model是消息绑定
             -->
            <el-form-item ref="email" label="邮箱" prop="email" show-message>
              <el-input auto-complete="off" suffix-icon="email" v-model="elForm.email"></el-input>
            </el-form-item>
            <el-button :disabled="sendEmailDisabled" @click="sendEmailAndCountDown">
              {{ sendEmailContent }}
            </el-button>
            <el-form-item label="用户名" prop="name">
              <el-input auto-complete="" suffix-icon="user" v-model="elForm.name"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input auto-complete="new-password" type="password" suffix-icon="password"
                        v-model="elForm.password"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="password2">
              <el-input auto-complete="new-password" type="password" suffix-icon="password"
                        v-model="elForm.password2"></el-input>
            </el-form-item>
            <el-form-item label="邮箱验证码" prop="emailCode" show-message>
              <el-input auto-complete="off" v-model="elForm.emailCode"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button :loading="loading" @click="submitForm">注册</el-button>
              <el-button :loading="loading" @click="cancel">返回</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import {clientAdd, sendEmailCode} from "@/api/client";

export default {
  components: {},
  props: [],
  data() {
    const validateEmail = (rule, value, callback) => {
      const regex = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/g
      if (!regex.test(value)) {
        callback(new Error('邮箱格式错误！'))
      } else {
        callback();
      }
    }
    const validateName = (rule, value, callback) => {
      const regex = /^[\u4e00-\u9fa5a-zA-Z\d]{3,10}$/g
      if (!regex.test(value)) {
        callback(new Error('3~10位,不包含特殊字符！'))
      } else {
        callback();
      }
    }
    const validatePassword = (rule, value, callback) => {
      const regex = /^[A-Za-z0-9$!?@#%^&]{6,20}$/g
      if (!regex.test(value)) {
        callback(new Error('密码只能由字母、数字、!、?、$、@、#、%、^、&构成,最少6位最高20位！'))
      } else {
        callback()
      }
    }
    const validatePassword2 = (rule, value, callback) => {
      if (value !== this.elForm.password) {
        callback(new Error('两次密码不一致'))
      } else {
        callback()
      }
    }
    const validateEmailCode = (rule, value, callback) => {
      const regex = /^[0-9]{4,8}$/g
      if (!regex.test(value)) {
        callback(new Error('验证码格式错误'))
      } else {
        callback()
      }
    }
    return {
      sendEmailDisabled: false,
      sendEmailWaitTime: 60,
      sendEmailContent: '发送验证码',
      redirect: undefined,
      elForm: {
        email: "",
        name: "",
        password: '',
        password2: '',
        emailCode: '',
      },
      rules: {
        email: [{
          required: true,
          trigger: 'blur',
          validator: validateEmail
        }],
        name: [{
          required: true,
          trigger: 'blur',
          validator: validateName
        }],
        password: [{
          required: true,
          trigger: 'blur',
          validator: validatePassword
        }],
        password2: [{
          required: true,
          trigger: 'blur',
          validator: validatePassword2
        }],
        emailCode: [{
          required: true,
          trigger: 'blur',
          validator: validateEmailCode
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
    sendEmailAndCountDown() {
      this.sendEmailDisabled = true
      sendEmailCode(this.elForm).then(res => {
        this.$message.success('发送邮箱验证码成功！')
      }).catch(err => {
        this.$message.error('发送邮箱验证码失败:' + err)
      }).finally( () => {
        let clock = window.setInterval(() => {
          this.sendEmailWaitTime--
          this.sendEmailContent = this.sendEmailWaitTime + 's后重新发送'
          if (this.sendEmailWaitTime === 0) {
            this.sendEmailContent = '发送验证码'
            this.sendEmailWaitTime = 60
            this.sendEmailDisabled = false
            clearInterval(clock)
          }
        }, 1000)
      })
    },
    submitForm() {
      this.$refs['elForm'].validate(valid => {
        if (valid) {
          this.loading = true
          clientAdd(this.elForm).then(res => {
            this.$message.success('注册成功！')
            const { token } = res.data
            // 登录操作
            this.$store.dispatch('client/setToken', token).then(() => {
              console.log("登录请求成功，准备跳转")
              this.$router.push({name: 'project_list'})
              this.loading = false
            })
          }).catch(err => {
            this.$message.error('页面跳转失败:' + err)
            this.loading = false
          })
        }
      })
    },
    cancel() {
      this.loading = true
      this.$router.push({path: '/login'})
      this.loading = false
    },
    resetForm() {
      this.$refs['elForm'].resetFields()
    }
  }
}
</script>

