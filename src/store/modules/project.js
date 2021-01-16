import {getAllProjects, projectInfoById, projectInto} from "@/api/project";
import {login} from "@/api/client";
import {setToken} from "@/utils/auth";

const getDefaultState = () => {
  return {
    projectId: '',
  }
}

const state = getDefaultState()

// 异步
const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_PROJECT_ID: (state, projectId) => {
    console.log(" state.projectId:")
    console.log(projectId)
    state.projectId = projectId
  },
}

const actions = {

  setProjectId({commit},projectId){
    commit('SET_PROJECT_ID', projectId)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

