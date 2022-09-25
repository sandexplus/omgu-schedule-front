import {createStore} from 'vuex'
import days from "@/store/modules/days";
import groups from "@/store/modules/groups";
import filters from "@/store/modules/filters";

export default createStore({
    state: {
        data: [],
        number: 0,
        selectedData: null,
        baseUrl: 'https://omgu-schedule.alexpl.site/'
    },
    getters: {},
    mutations: {
        setSelectedData(state, payload) {
            state.selectedData = state.data[state.number];
        },
        setData(state, payload) {
            state.data.push(payload)
        },
        setNumber(state, payload) {
            state.number = payload;
            localStorage.setItem('selectedData', payload)
        }
    },
    actions: {
        async setData(context, payload) {
            const count = await fetch(`${context.state.baseUrl}count.json`)
                .then(res => res.json())
                .then(data => data.count)

            for (let i = 0; i < await count; i++) {
                const data = await fetch(`${context.state.baseUrl}data${i}.json`)
                    .then(res => res.json())
                    .then(data => {
                        context.commit('setData', data);
                        context.commit('setSelectedData');
                        const number = localStorage.getItem('selectedData') ?
                            localStorage.getItem('selectedData') :
                            0;
                        context.commit('setNumber', number)
                        context.commit('setGroupNames', Object.keys(data))
                        return '200'
                    })
                    .catch(err => err)
            }
        }
    },
    modules: {
        days,
        groups,
        filters
    }
})
