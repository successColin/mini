import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    requestLoading: false,

    // userInfo: {},
    // allUser: {},
    // token: '',
  },
  mutations: {
    request_show_loading(state) {
      state.requestLoading = true;
    },
    request_hide_loading(state) {
      state.requestLoading = false;
    },

    // // 个人信息详情
    // setUserInfo(state, userInfo) {
    //   // console.log(userInfo);
    //   state.userInfo = userInfo;
    // },
    // // 个人信息详情
    // setAllUser(state, userInfo) {
    //   if (userInfo.id) {
    //     state.allUser[userInfo.id] = userInfo;
    //   } else {
    //     state.allUser = {};
    //   }
    // },
    // setToken(state, token) {
    //   state.token = token;
    // },
  },
});
export default store;
