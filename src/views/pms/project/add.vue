<template>
  <div class="app-container">
    <el-form ref="projectForm" :model="data" :rules="formRules" label-width="120px">
      <el-form-item label="项目名" prop="projectTitle">
        <el-input v-model="data.projectTitle"/>
      </el-form-item>
      <el-form-item label="项目描述" prop="projectDescription">
        <el-input v-model="data.projectDescription"/>
      </el-form-item>
      <el-form-item>
        <el-button @click="onSubmit">新建</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {projectAdd} from "@/api/project";

export default {
  data() {
    const validateTitle = (rule, value, callback) => {
      const regex = /^[\u4e00-\u9fa5a-zA-Z\d]{1,20}$/g
      if (!regex.test(value)) {
        callback(new Error('标题只能是1到20个不包含特殊字符的字符'))
      } else {
        callback()
      }
    }
    return {
      data: {
        projectTitle: '',
        projectDescription: '',
      },
      formRules: {
        projectTitle: [{ required: true, trigger: 'blur', validator: validateTitle }],
      },
    }
  },
  mounted() {
  },
  methods: {
    onSubmit() {
      this.$refs.projectForm.validate((valid) => {
        if (valid) {
          projectAdd(this.data).then(res => {
            this.$message.success('添加项目成功')
            //用 name 来传
            this.$router.push({ name: 'project_list' })
          }).catch(err => {
            this.$message.error('新增项目失败:' + err)
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

