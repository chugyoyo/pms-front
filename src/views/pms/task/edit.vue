<template>
  <div class="app-container">
    <el-form ref="userForm" :model="data" :rules="formRules" label-width="120px">
<!--      <el-form-item label="任务号" prop="taskId">-->
<!--        <el-input v-model="data.taskId" readonly/>-->
<!--      </el-form-item>-->
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
      <el-form-item label="任务完成时间" prop="taskFinishedTime">
        <el-date-picker v-model="data.taskFinishedTime"/>
      </el-form-item>
      <el-form-item label="任务截止时间" prop="taskDeadline">
        <el-date-picker v-model="data.taskDeadline"/>
      </el-form-item>
      <el-form-item label="任务状态" prop="taskStatus">
        <el-select v-model="data.taskStatus" placeholder="选择状态">
          <el-option v-for="status in taskStatusList" :label="status.label" :value="status.value"/>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">修改</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {taskInfoById, taskUpdate} from "@/api/task";
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
        taskId: '',
        taskName: '',
        taskPrinciple: '',
        taskFinishedTime: '',
        taskDeadline: '',
        taskStatus: '',
        taskDetail: '',
        taskProject: '',
      },
      formRules: {
        taskName: [{required: true, trigger: 'blur', validator: validateTitle}],
        taskStatus: [],
        taskPrinciple: []
      },
      taskStatusList: [
        {value: 'UNFINISHED', label: '未完成'},
        {value: 'FINISHED', label: '已完成'},
        {value: 'OVERDUE_FINISHED', label: '逾期已完成'},
        {value: 'OVERDUE_UNFINISHED', label: '逾期未完成'},
      ],
      projectMembers: [{
        clientId: '',
        clientName: '',
      }],
    }
  },
  // 页面加载后生效
  mounted() {
    const params = this.$route.params
    console.log('data.taskId=' + params.taskId)
    this.data.taskId = params.taskId
    console.log('projectId=' + params.projectId)
    this.data.taskProject = params.projectId
    this.loadInfo()
  },
  methods: {
    loadInfo() {
      // 获取项目的成员信息
      if (this.data.taskProject > 0) {
        projectMember(this.data.taskProject).then(res => {
          this.projectMembers = res.data
        }).catch(err => {
          this.$message.error('获取成员信息失败:' + err)
        })
      }
      if (this.data.taskId > 0) {
        taskInfoById(this.data.taskId).then(res => {
          this.data = res.data
        }).catch(err => {
          this.$message.error('获取任务信息失败:' + err)
        })
      }
    },
    onSubmit() {
      this.$refs.userForm.validate((valid) => {
        if (valid) {
          taskUpdate(this.data).then(res => {
            this.$message.success('更新任务成功')
            this.$router.push({path: 'list'})
          }).catch(err => {
            this.$message.error('更新任务失败:' + err)
          })
        } else {
          return false
        }
      })
    },
    onCancel() {
      this.$router.push({name: 'task_list'})
    }
  }
}
</script>

<style scoped>
.line {
  text-align: center;
}
</style>

