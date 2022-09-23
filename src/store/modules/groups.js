export default {
    state: {
        selectedGroup: '',
        groupNames: [],
    },
    getters: {
        getScheduleByGroup(state, _, globalState) {
            return (groupName) => {
                if (globalState.data && globalState.data[groupName])
                    return globalState.data[groupName];
                else
                    return []
            }
        },
    },
    mutations: {
        setGroup(state, payload) {
            if (!payload) return;
            if (localStorage.getItem('selectedGroup') !== payload) {
                localStorage.setItem('selectedGroup', payload);
            }
            state.selectedGroup = payload
        }
    },
}
