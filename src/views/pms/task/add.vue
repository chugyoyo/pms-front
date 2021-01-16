<template>
  <div class="app-container">
    <el-form ref="userForm" :model="data" :rules="formRules" label-width="120px">
      <el-form-item label="任务名" prop="taskName">
        <el-input v-model="data.taskName"/>
      </el-form-item>
      <el-form-item label="任务详情" prop="taskDetail">
        <el-input v-model="data.taskDetail"/>
      </el-form-item>
      <el-form-item label="任务负责人" prop="taskPrinciple">
        <el-select v-model="data.taskPrinciple" placeholder="选择负责人">
          <el-option v-for="member in projectMembers" :label="member.clientName" :value="member.clientId"/>
        </el-select>
      </el-form-item>
      <el-form-item label="任务截止时间" prop="taskDeadline">
        <el-date-picker v-model="data.taskDeadline"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">添加</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
import {taskAdd} from "@/api/task";
import {projectMember} from "@/api/project";

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
        taskName: '',
        taskPrinciple: '',
        taskDeadline: '',
        taskProject: '',
        taskDetail: '',
      },
      formRules: {
        taskName: [{
          required: true,
          trigger: 'blur',
          validator: validateTitle
        }],
        taskPrinciple:[{
          required: true,
          trigger: 'blur',
          message: '负责人不能为空',
        }],
      },
      projectMembers: [{
        clientId: '',
        clientName: '',
      }],
    }
  },
  // 页面加载后生效
  mounted() {
    const params = this.$route.params
    console.log('projectId=' + params.projectId)
    this.data.taskProject = params.projectId
    this.loadInfo()
  },
  methods: {
    loadInfo(){
      if ( this.data.taskProject > 0) {
        projectMember(this.data.taskProject).then(res => {
          this.projectMembers = res.data
        }).catch(err => {
          this.$message.error('获取成员信息失败:' + err)
        })
      }
    },
    onSubmit() {
      this.$refs.userForm.validate((valid) => {
        if (valid) {
          taskAdd(this.data).then(res => {
            this.$message.success('添加任务成功')
            //用 name 来传
            this.$router.push({ name: 'task_list' })
          }).catch(err => {
            this.$message.error('新增任务失败:' + err)
          })
        } else {
          return false
        }
      })
    },
    onCancel() {
      // 在同一个路径下的list（相对路径）
      this.$router.push({ path: 'list' })
    }
  }
}
</script>

<style scoped>
  .line {
    text-align: center;
  }
</style>

