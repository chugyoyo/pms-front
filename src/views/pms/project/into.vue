<template>
  <div class="app-container">
    <el-form ref="code" :model="data" :rules="formRules" label-width="120px">
      <el-form-item label="邀请码" prop="projectCode">
        <el-input v-model="data.projectCode"/>
      </el-form-item>
      <el-form-item>
        <el-button @click="onSubmit">加入</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { projectInto } from "@/api/project";

export default {
  data() {
    const validateCode = (rule, value, callback) => {
      const regex = /^[0-9]{4,8}$/g
      if (!regex.test(value)) {
        callback(new Error('邀请码格式错误！'))
      }else {
        callback();
      }
    }
    return {
      data: {
        projectCode: '',
      },
      formRules: {
        projectCode: [{ validator: validateCode, trigger: 'blur'}],
      },
    }
  },
  mounted() {
  },
  methods: {
    onSubmit() {
      this.$refs['code'].validate((valid) => {
        console.log(this.data.projectCode)
        if (valid) {
          // 请求传参数要这么传！！！
          projectInto({ projectCode: this.data.projectCode } ).then(res => {
            this.$message.success('加入项目成功')
            //用 name 来传
            this.$router.push({ name: 'project_list' })
          }).catch(err => {
            this.$message.error('加入项目失败:' + err)
          })
        } else {
          return false
        }
      })
    },
    onCancel() {
      // 在同一个路径下的list（相对路径）
      this.$router.push({ path: '/' })
    }
  }
}
</script>

<style scoped>
  .line {
    text-align: center;
  }
</style>

