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
        showAllSchedule: false
    },
    mutations: {
        setSubgroup(state, payload) {
            state.subgroup = payload;
        }
    }
}
