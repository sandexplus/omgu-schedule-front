<template>
    <div :class="['line', {'line_current': currentLesson}]">
        <div class="line__inner" v-if="data">
            <p class="line__text line__number">{{ idx + 1 }}</p>
            <p class="line__text">{{ data.type ? data.type : '' }}</p>
            <p class="line__text">{{ data.subgroup ? data.subgroup : '1/2' }}</p>
            <p class="line__text">{{ time }}</p>
            <p class="line__text">{{ data.lesson }}</p>
            <p class="line__text">{{ data.cabinet }}</p>
            <p class="line__text">{{ data.teacher }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: "ScheduleLine",
    props: ['data', 'idx', 'isToday'],
    computed: {
        time() {
            return `${this.data.time.start.hours}:${this.data.time.start.minutes} ${this.data.time.end.hours}:${this.data.time.end.minutes}`
        },
        colorOfBefore() {
            const type = this?.data?.type;
            if (type === 'Прак.') {
                return '#FF0000'
            }
            if (type === 'Лек.') {
                return '#FFA500'
            }
            if (type === 'Лаб.') {
                return '#008000'
            }
            return 'grey'
        },
        currentLesson() {
            const currentDate = new Date()

            const startDate = new Date(currentDate.getTime());
            startDate.setHours(this.data.time.start.hours);
            startDate.setMinutes(this.data.time.start.minutes);

            const endDate = new Date(currentDate.getTime());
            endDate.setHours(this.data.time.end.hours);
            endDate.setMinutes(this.data.time.end.minutes);

            return startDate < currentDate && endDate > currentDate && this.isToday
        }
    },
}
</script>

<style lang="scss" scoped>
.line {
    &__inner {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 2fr 3fr 2fr 3fr;
    }
    &__number {
        position: relative;
        &:before {
            content: '';
            width: 7px;
            height: 100%;
            left: 0;
            top: 0;
            display: block;
            position: absolute;
            z-index: 1;
            background: v-bind(colorOfBefore);
        }
    }
    &__text {
        padding: 16px 15px;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 15px;
        line-height: 18px;
        color: #000000;
    }
}
</style>
