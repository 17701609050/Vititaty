/* eslint-disable */
import admin from '../../api/admin'

const state = {
  adminAuth: null
}

const mutations = {
  SET_USER_INFO(state, data) {
    state.adminAuth = data
  }

}

const actions = {
  // 管理员登录
  async login({state, commit}, params) {
    console.log(params)
    return admin.login(params);
  },

  // 获取当前管理员信息
  async auth({state, commit}, params) {
    const res = await admin.auth(params);
    commit('SET_USER_INFO', res.data.data);
    return res;
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
