<template>
  <div class="app-container">
    <el-form ref="projectForm" :model="dataForm" :rules="formRules" label-width="120px">
<!--      <el-form-item label="用户号" prop="clientId">-->
<!--        <el-input v-model="dataForm.clientId" readonly/>-->
<!--      </el-form-item>-->
      <el-form-item label="用户名" prop="clientName">
        <el-input v-model="dataForm.clientName"/><el-button @click="onSubmit" :loading="loading">修改</el-button>
      </el-form-item>
      <el-form-item label="用户邮箱" prop="clientEmail">
        <el-input v-model="dataForm.clientEmail" readonly/>
      </el-form-item>
      <el-form-item label="用户创建时间" prop="clientCreatedTime">
        <el-date-picker v-model="dataForm.clientCreatedTime"  :formatter="format" readonly/>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { clientChangeName} from '@/api/client'
import {mapGetters} from "vuex";

export default {
  computed: {
    ...mapGetters([
      'clientInfo',
    ])
  },
  data() {
    const validateName = (rule, value, callback) => {
      const regex = /^[\u4e00-\u9fa5a-zA-Z\d]{3,10}$/g
      if (!regex.test(value)) {
        callback(new Error('用户名是3~10位,不包含特殊字符！'))
      } else {
        callback();
      }
    }
    return {
      loading : false,
      dataForm: {
        clientId:'',
        clientName: '',
        clientEmail:'',
        clientCreatedTime:''
      },
      formRules: {
        clientName: [{required: true, trigger: 'blur', validator: validateName}],
      },
    }
  },
  // 页面加载后生效
  mounted() {
    this.dataForm.clientId = this.$store.getters.clientInfo.clientId
    this.dataForm.clientName = this.$store.getters.clientInfo.clientName
    this.dataForm.clientEmail = this.$store.getters.clientInfo.clientEmail
    this.dataForm.clientCreatedTime = this.$store.getters.clientInfo.clientCreatedTime
  },
  methods: {
    onSubmit() {
      this.$refs.projectForm.validate((valid) => {
        if (valid) {
          this.loading = true
          clientChangeName(this.dataForm.clientName ).then(res => {
            this.$message.success('修改用户名成功')
            this.$store.dispatch('client/getClientInfo').then(() => {
                console.log("设置值成功，准备跳转")
                this.$router.push({path: '/'})
                this.loading = false
              }).catch((err) => {
                this.$message.error(err.message)
                this.loading = false
              })
          }).catch(err => {
            this.$message.error('修改用户名失败:' + err)
            this.loading = false
          })
        } else {
          return false
        }
      })
    },
    onCancel() {
      this.$router.push({name: 'project_list'})
    }
  }
}
</script>

<style scoped>
.line {
  text-align: center;
}
</style>

