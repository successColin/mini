import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
	state:{
		requestLoading: false
	},
	mutations: {
		request_show_loading(state) {
			state.requestLoading = true;
		},
		request_hide_loading(state) {
			state.requestLoading = false;
		}
	}
})
export default store

