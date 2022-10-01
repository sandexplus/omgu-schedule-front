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
        <button @click="openAnnotation" v-click-outside="closeAnnotation" class="line__more">
            <img :style="{transform: annotationOpened ? '' : 'rotate(90deg)'}" src="@/assets/icons/triple-dot.svg" alt="Dots">
        </button>
        <transition>
            <div class="line__annotation" v-show="annotationOpened">
                <p class="line__text">Недели: {{ readableWeeks }}</p>
                <p class="line__text">Четность: {{ data.even_odd ? data.even_odd : 'Любая' }}</p>
                <p class="line__text">Выборный: {{ data.chosen_lesson ? 'Да' : 'Нет' }}</p>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    name: "ScheduleLine",
    props: ['data', 'idx', 'isToday'],
    data() {
        return {
            annotationOpened: false
        }
    },
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
        },
        readableWeeks() {
            if (!this.data) return '';
            const weeks = this.data.week;
            let strWeeks = '';
            weeks.forEach(week => {
                if (week[0] === week[1]) {
                    strWeeks += week[0] + ', '
                } else {
                    strWeeks += `${week[0]}-${week[1]}, `;
                }
            })

            strWeeks = strWeeks.slice(0, -2);
            return strWeeks
        }
    },
    methods: {
        openAnnotation() {
            this.annotationOpened = true;
        },
        closeAnnotation() {
            this.annotationOpened = false;
        }
    }
}
</script>

<style lang="scss" scoped>
.v-enter-active,
.v-leave-active {
    transition: opacity .3s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}

.line {
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
    &__annotation {
        position: absolute;
        right: 15px;
        top: calc(50% + 10px);
        background: #fff;
        z-index: 99;
        box-shadow: 0px 4px 4px rgb(0 0 0 / 25%);
    }
    &__more {
        position: absolute;
        top: 50%;
        right: 15px;
        transform: translateY(-50%);
        & img {
            transition: .3s all;
        }
    }
    &__inner {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 2fr 3fr 2fr 3fr;
        @media (max-width: 1000px) {
            grid-template-columns: 1fr 1fr 2fr 3fr 2fr 3fr;
        }
    }
    &__number {
        @media (max-width: 1000px) {
            display: none;
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
