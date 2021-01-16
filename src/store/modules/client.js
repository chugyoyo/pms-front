import { login, getClientInfo } from '@/api/client'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import da from "element-ui/src/locale/lang/da";

const getDefaultState = () => {
  return {
    token: getToken(),
    // clientInfo: {
    //   clientId: '',
    //   clientName: '',
    //   clientEmail: '',
    //   clientCreatedTime: 'npm ',
    //   clientStatus: ''
    // },
    clientInfo: ''
  }
}

const state = getDefaultState()

// 异步
const mutations = {
  // 本质是改变state的值
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  /*
store.commit({
type: 'SET_TOKEN',
amount: token
})
 */
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_CLIENT_INFO: (state, clientInfo) => {
    state.clientInfo = clientInfo
  },
}

const actions = {
  // user login
  login({ commit }, loginInfo) {
    const { email, password , verificationCode } = loginInfo
    return new Promise((resolve, reject) => {
      login({ email: email.trim(), password: password,verificationCode:verificationCode }).then(response => {
        // const a = b.a
        const { token } = response.data
        console.log(token)
        commit('SET_TOKEN', token)
        setToken(token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getClientInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getClientInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          reject('信息校验失败,请重新登录.')
        }

        commit('SET_CLIENT_INFO', data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      removeToken() // must remove  token  first
      resetRouter()
      commit('RESET_STATE')
      resolve()
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  },

  // 注册成功后的跳转
  setToken({ commit }, token){
    return new Promise(resolve => {
      setToken(token) // must remove  token  first
      commit('SET_TOKEN',token)
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

