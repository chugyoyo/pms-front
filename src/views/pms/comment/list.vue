<template>
  <div class="app-container">
    <el-row>
      <el-col :span="1">
        <el-button @click="newTask">新建任务</el-button>
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
      <el-table-column label="任务号" prop="taskId"/>
      <el-table-column label="任务名" prop="taskName"/>
      <el-table-column label="任务负责人" prop="taskPrinciple"/>
      <!--      <el-table-column label="任务所在项目" prop="taskProject" />-->
      <el-table-column label="任务截止时间" prop="taskDeadline" :formatter="format"/>
      <el-table-column label="任务详情" prop="taskDetail"/>
      <el-table-column label="任务完成时间" prop="taskFinishedTime" :formatter="format"/>
      <el-table-column label="任务状态" prop="taskStatus"/>
      <el-table-column label="任务操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="check(scope.$index)">查看</el-button>
          <el-button type="text" size="small" @click="edit(scope.$index)">编辑</el-button>
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
import {getTaskList, taskDel} from "@/api/task";
import {mapGetters} from "vuex";

export default {
  computed: {
    ...mapGetters([
      'projectId',
    ])
  },
  data() {
    return {
      list: [],
      loading: false,
      pagination: {
        current: 1,
        size: 10,
        total: 0,
        order: 'id desc',
        projectId: '',
      }
    }
  },
  // 此时method和data准备完毕，但是没有显示数据
  mounted() {
    // console.log("this.$store.getters.projectId")
    // console.log(this.$store.getters.projectId);
    // this.loadList();
  },
  // 页面更新数据后还没显示新数据
  created() {
    console.log("this.$store.getters.projectId")
    console.log(this.$store.getters.projectId);
    this.loadList();
  },
  methods: {
    loadList() {
      this.loading = true
      const projectId =  this.$store.getters.projectId
      this.pagination.projectId = projectId
      console.log('data.pagination=')
      console.log(this.pagination)
      if ( projectId > 0) {
        getTaskList(this.pagination).then(res => {
          const { data } = res
          this.pagination.total = data.total
          this.list = data.records
          this.loading = false
        }).catch(err => {
          console.error(err)
          this.loading = false
        })
      }
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
        name: 'task_edit',
        params: {
          projectId: data.taskProject,
          taskId: data.taskId
        }
      })
    },
    newTask() {
      this.$router.push({
        name: 'task_add',
        params:{
          projectId:  this.$store.getters.projectId
        }
      })
    },
    del(index) {
      const data = this.list[index]
      taskDel(data.taskId).then(res => {
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
