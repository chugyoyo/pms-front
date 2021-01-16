<template>
  <div class="dashboard-container">
    <div class="dashboard-text">欢迎您: {{ clientInfo }}</div>
    <div>
      <el-row :gutter="15">
        <el-form ref="elForm" :model="elForm" :rules="rules" size="medium" label-width="100px">
          <el-col :span="12">
            <el-form-item label="选择项目" prop="field101">
              <!--v-model是跟vue的data绑定-->
              <el-select v-model="elForm.projectId"
                         placeholder="请选择下拉选择选择项目"
                         clearable :style="{width: '100%'}">
                <el-option v-for="(item, index) in projectsList" :key="index" :label="item.projectTitle"
                           :value="item.projectId" :disabled="item.disabled"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="" prop="field106">
              <el-button type="primary" icon="el-icon-folder-add" size="medium" @click="createProject"> 新建项目 </el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <el-table
        v-loading="loading"
        :data="tasksInfoList"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
      >
        <el-table-column align="center" label="ID" width="95" prop="taskId" />
        <el-table-column label="所属渠道" prop="taskName" />
        <el-table-column label="姓名" prop="name" />
        <el-table-column label="微信昵称" prop="nickname" />
        <el-table-column label="手机号" prop="mobile" />
        <el-table-column label="最后登录IP" prop="lastIp" />
        <el-table-column label="最后登录时间" prop="lastTime" :formatter="timeFormatter" />
        <el-table-column label="创建时间" prop="createTime" :formatter="timeFormatter" />
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="edit(scope.$index)">编辑</el-button>
            <el-button type="text" size="small" @click="del(scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'clientInfo',
      'tasksInfoList',
    ])
  },
  data() {
    return {
      elForm: {
        projectId: "",
      },
      rules: {
        project: [{
          message: '请选择下拉选择选择项目',
          trigger: 'change'
        }],
      },
      projectsList: [{
        "projectId": '2',
        "projectTitle": '项目2'
      }, {
        "projectId": '3',
        "projectTitle": '项目3'
      }, {
        "projectId": '1',
        "projectTitle": '项目1'
      }],
    }
  },
  methods: {
    createProject(){
      console.log("开始创建项目");
    },

  },
  mounted() {

  },
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
