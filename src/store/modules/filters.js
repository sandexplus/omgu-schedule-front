function getCurrentSemester() {
    const month = new Date().getMonth() + 1;
    if (month < 8) {
        return 2
    } else {
        return 1
    }
}

function getCurrentWeek() {
    const date = new Date();
    const firstMonth = getCurrentSemester() === 1 ? 8 : 0;
    const firstDayOfMonth = new Date(date.getFullYear(), firstMonth, 1);
    return Math.ceil((((date - firstDayOfMonth) / 86400000) + firstDayOfMonth.getDay() + 1) / 7);
}

function getEvenOddWeek() {
    return getCurrentWeek() % 2 === 0 ? 'ч/н' : 'н/н';
}

export default {
    state: {
        subgroup: null,
        chosenLesson: null,
        currentSemester: getCurrentSemester(),
        currentWeek: getCurrentWeek(),
        currentEvenOddWeek: getEvenOddWeek(),
        showAllSchedule: false,
        searchedString: ''
    },
    mutations: {
        setSubgroup(state, payload) {
            state.subgroup = payload;
            localStorage.setItem('subgroup', payload)
        },
        setShowAll(state) {
            state.showAllSchedule = !state.showAllSchedule;
        },
        setChosenLesson(state, payload) {
            state.chosenLesson = payload;
            localStorage.setItem('chosenLesson', payload)
        },
        setSearchedString(state, payload) {
            state.searchedString = payload;
        }
    },
    actions: {
        setSearchedString(context, data) {
            context.commit('setSearchedString', data);
            if (!data) {
                context.commit('setSearchedData', null);
                return;
            }
            let arr = {
                'ПН': [],
                'ВТ': [],
                'СР': [],
                'ЧТ': [],
                'ПТ': [],
                'СБ': [],
            };
            context.rootState.data.map(item => {
                for (let i in item) {
                    for (let j in item[i]) {
                        for (let k in item[i][j]) {
                            const val = item[i][j][k];
                            if (!val) continue;
                            const teacher = val.teacher.toLowerCase();
                            const lesson = val.lesson.toLowerCase();
                            const cabinet = val.cabinet.toLowerCase();

                            if (teacher.includes(data.toLowerCase())
                                || lesson.includes(data.toLowerCase())
                                || cabinet.includes(data.toLowerCase())) {

                                arr[j].push(val);
                            }
                        }
                    }
                }
            })
            context.commit('setSearchedData', arr);
            // state.searchedString = payload.string;
            // console.log(payload.rootState)
        }
    }
}
