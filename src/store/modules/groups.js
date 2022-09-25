export default {
    state: {
        selectedGroup: '',
        groupNames: [],
        chosenLessons: []
    },
    getters: {
        getScheduleByGroup(state, _, globalState) {
            return (groupName) => {
                if (globalState.selectedData && globalState.selectedData[groupName])
                    return globalState.selectedData[groupName];
                else
                    return []
            }
        },
        getGroupNames(state) {
            return (idx) => {
                return state[idx]
            }
        }
    },
    mutations: {
        setGroup(state, payload) {
            if (!payload) return;
            if (localStorage.getItem('selectedGroup') !== payload) {
                localStorage.setItem('selectedGroup', payload);
            }
            state.selectedGroup = payload
        },
        setGroupNames(state, payload) {
            state.groupNames.push(payload)
        }
    },
    actions: {
        setChosenLessons(context) {
            const selectedGroup = context.rootState.selectedData[context.state.selectedGroup];

            const uniqueLessons = new Set();

            for (let key in selectedGroup) {
                selectedGroup[key].forEach(item => {
                    if (item && item.chosen_lesson) {
                        uniqueLessons.add(item.lesson)
                    }

                })
            }
            context.state.chosenLessons = [...uniqueLessons]
        }
    }
}
