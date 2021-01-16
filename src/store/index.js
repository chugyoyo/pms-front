import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import client from "@/store/modules/client";
import project from "@/store/modules/project";
import task from "@/store/modules/task";
import createPersistedState from "vuex-persistedstate"
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    client,
    project,
    task
  },
  getters,
  // 持久化
  plugins: [createPersistedState()]
})

export default store
