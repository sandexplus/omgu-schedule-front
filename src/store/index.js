import { createStore } from 'vuex'
import days from "@/store/modules/days";
import groups from "@/store/modules/groups";

export default createStore({
  state: {
    data: null
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    async setData(context, payload) {
      return await fetch('https://omgu-schedule.alexpl.site/data.json')
          .then(res => res.json())
          .then(data => {
            context.state.data = data
            context.rootState.groups.groupNames = Object.keys(data);
            return '200'
          })
          .catch(err => err)
    }
  },
  modules: {
    days,
    groups,
  }
})
