<template>
  <div class="app-container">
    <el-row>
      <el-col :span="1">
        <el-button @click="newProject">新建项目</el-button>
      </el-col>
      <el-col>
        <el-button @click="intoProject">加入项目</el-button>
      </el-col>
    </el-row>
    <el-table
      v-loading="loading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
<!--      <el-table-column label="项目号" prop="projectId"/>-->
      <el-table-column label="项目名" prop="projectTitle"/>
      <el-table-column label="项目描述" prop="projectDescription"/>
      <el-table-column label="项目超级管理员" prop="projectRootName"/>
      <el-table-column label="项目邀请码" prop="projectCode"/>
      <el-table-column label="项目创建时间" prop="projectCreatedTime" :formatter="timeFormatter"/>
      <el-table-column label="项目操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="check(scope.$index)">查看</el-button>
          <el-button type="text" size="small" @click="edit(scope.$index)">编辑</el-button>
          <el-button type="text" size="small" @click="leave(scope.$index)">退出</el-button>
          <el-button type="text" size="small" @click="del(scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row>
      <el-col :span="24">
        <el-pagination
          background
          :current-page="pagination.current"
          :page-sizes="[10,20, 50, 100]"
          :page-size="pagination.size"
          layout="total,sizes, prev, pager, next,jumper"
          :total="pagination.total"
          @size-change="onSizeChange"
          @current-change="onPageChange"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import DateUtil from '../../../utils/DateUtil'
import {getProjectsList, projectDel, projectLeave} from "@/api/project";
import {mapActions, mapGetters, mapMutations, mapState} from "vuex";
import {SET_PROJECT_INFO} from "@/store/mutation-types";
import list from "@/views/pms/task/list";

export default {
  data() {
    return {
      list: [],
      loading: false,
      pagination: {
        current: 1,
        size: 10,
        total: 0,
        order: 'id desc',
      }
    }
  },
  created() {
    this.loadList()
  },
  methods: {
    loadList() {
      this.loading = true
      getProjectsList(this.pagination).then(res => {
        const data = res.data
        this.pagination.total = data.total
        this.list = data.records
        this.loading = false
      }).catch(err => {
        console.error(err)
        this.loading = false
      })
    },
    onSizeChange(size) {
      this.pagination.size = size
      this.loadList()
    },
    onPageChange(page) {
      this.pagination.current = page
      this.loadList()
    },
    edit(index) {
      console.log(index)
      const data = this.list[index]
      console.log(data)
      this.$router.push({
        // params只能用name来引入路由
        name: 'project_edit',
        params: {
          projectId: data.projectId
        }
      })
    },
    leave(index) {
      const data = this.list[index]
      projectLeave(data.projectId).then(res => {
        this.$message.success('退出项目成功')
        this.list.splice(index, 1)
      }).catch(err => {
        this.$message.error('退出项目失败:' + err)
      })
    },
    // 进入项目的相关任务表
    check(index) {
      this.loading = true
      const projectInfo = this.list[index]
      // 同步,不可回调,在此刻完成
      // SET_PROJECT_INFO(projectInfo)
      this.$store.dispatch('project/setProjectId', projectInfo.projectId).then(() => {
        // this.$router.push({ path: this.redirect || '/' })
        console.log("请求成功，准备跳转task_list")
        this.$router.push({name: 'task_list'})
        this.loading = false
      }).catch((err) => {
        this.$message.error(err.message)
        this.loading = false
      })
    },
    newProject() {
      this.$router.push({name: 'project_add'})
    },
    intoProject() {
      this.$router.push({name: 'project_into'})
    },
    del(index) {
      const data = this.list[index]
      projectDel(data.projectId).then(res => {
        this.$message.success('删除成功')
        this.list.splice(index, 1)
      }).catch(err => {
        this.$message.error('删除失败:' + err)
      })
    },
    timeFormatter(row, column, cellValue, index) {
      return DateUtil.format(cellValue)
    }
  }
}
</script>

<style lang="scss" scoped>
.avatar {
  width: 100px;
  height: auto;
}
</style>
