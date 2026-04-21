import Vuex from 'vuex'
import Vue from 'vue'

 Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0,
    setSelectMenu: ''
  },
  mutations: {
    increment (state) {
      state.count++
    },
    setSelectMenu (state, {value}) {
      state.setSelectMenu = value
    }
  }
})

export default store