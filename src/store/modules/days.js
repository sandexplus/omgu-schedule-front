export default {
    state: {
        daysOfWeek: {
            'ПН': 'Понедельник',
            'ВТ': 'Вторник',
            'СР': 'Среда',
            'ЧТ': 'Четверг',
            'ПТ': 'Пятница',
            'СБ': 'Суббота',
            'ВС': 'Воскресенье'
        }
    },
    getters: {
        getExactDayOfWeek(state) {
            return (idx) => {
                return state.daysOfWeek[idx]
            }
        }
    }
}
