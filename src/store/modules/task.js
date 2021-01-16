import {getAllTasks} from "@/api/task";

const getDefaultState = () => {
  return {
    tasksInfoList: [{
      taskId: '',
      taskStatus: '',
      taskPrinciple: '',
      taskProject: '',
      taskDeadline: '',
      taskFinishedTime: '',
      taskName: '',
      taskDetail: ''
    }]
  }
}

const state = getDefaultState()

// 异步
const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TASKS_INFO_LIST: (state, tasksInfoList) => {
    state.tasksInfoList = tasksInfoList
  },
}

const actions = {

  getAllTasks({ commit, state }) {
    return new Promise((resolve, reject) => {
      getAllTasks(state.token).then(response => {
        const { data } = response

        if (!data) {
          reject('信息校验失败,请重新登录.')
        }

        commit('SET_TASKS_INFO_LIST', data)

        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}

