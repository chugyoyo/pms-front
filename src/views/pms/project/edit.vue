<template>
  <div class="app-container">
    <el-form ref="projectForm" :model="data" :rules="formRules" label-width="120px">
<!--      <el-form-item label="项目号" prop="projectId">-->
<!--        <el-input v-model="data.projectId" readonly/>-->
<!--      </el-form-item>-->
      <el-form-item label="项目名" prop="projectTitle">
        <el-input v-model="data.projectTitle"/>
      </el-form-item>
      <el-form-item label="项目负责人" prop="projectRoot">
        <el-select v-model="data.projectRoot" placeholder="选择负责人">
          <el-option v-for="member in projectMembers" :label="member.clientName" :value="member.clientId"/>
        </el-select>
      </el-form-item>
      <el-form-item label="项目描述" prop="projectDescription">
        <el-input v-model="data.projectDescription"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">修改</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {projectInfoById, projectMember, projectUpdate} from "@/api/project";

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
        projectId: '',
        projectTitle: '',
        projectDescription: '',
        projectRoot: '',
      },
      formRules: {
        projectTitle: [{required: true, trigger: 'blur', validator: validateTitle}],
      },
      projectMembers: [{
        // 这里有许多字段
        clientId: '',
        clientName: '',
      }],
    }
  },
  // 页面加载后生效
  mounted() {
    const params = this.$route.params
    console.log('projectId=' + params.projectId)
    this.data.projectId = params.projectId
    this.loadInfo()
  },
  methods: {
    loadInfo() {
      // 获取项目的成员信息
      if (this.data.projectId > 0) {
        projectMember(this.data.projectId).then(res => {
          this.projectMembers = res.data
        }).catch(err => {
          this.$message.error('获取成员信息失败:' + err)
        })
      }
      if (this.data.projectId > 0) {
        projectInfoById(this.data.projectId).then(res => {
          this.data = res.data
        }).catch(err => {
          this.$message.error('获取任务信息失败:' + err)
        })
      }
    },
    onSubmit() {
      this.$refs.projectForm.validate((valid) => {
        if (valid) {
          projectUpdate(this.data).then(res => {
            this.$message.success('更新项目成功')
            this.$router.push({path: '/'})
          }).catch(err => {
            this.$message.error('更新项目失败:' + err)
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

