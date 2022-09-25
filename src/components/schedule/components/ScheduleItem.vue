<template>
    <div class="item">
        <schedule-header
            :is-today="isToday"
            :week-day="exactDayOfWeek"
        >
        </schedule-header>
        <schedule-line
            v-for="(line, i) in filteredSchedule"
            :key="i"
            :data="line"
            :idx="i"
            :is-today="isToday"
        >
        </schedule-line>
    </div>
</template>

<script>
import ScheduleHeader from "@/components/schedule/components/ScheduleHeader";
import ScheduleLine from "@/components/schedule/components/ScheduleLine";
import {mapState} from 'vuex';
export default {
    name: "ScheduleItem",
    components: {ScheduleLine, ScheduleHeader},
    props: ['dayIndex', 'dayData'],
    computed: {
        filterSubgroup() {
            return this.$store.state.filters.subgroup
        },
        filterChosenLesson() {
            return this.$store.state.filters.chosenLesson
        },
        filterEvenOdd() {
            return this.$store.state.filters.currentEvenOddWeek
        },
        showAllSchedule() {
            return this.$store.state.filters.showAllSchedule;
        },
        exactDayOfWeek() {
            return this.$store.getters.getExactDayOfWeek(this.dayIndex)
        },
        isToday() {
            const days = this.$store.state.days.daysOfWeek;
            const index = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1;
            const arrayOfDaysValues = Object.values(days);
            return arrayOfDaysValues[index] === this.exactDayOfWeek
        },
        filteredSchedule() {

            const currentWeek = this.$store.state.filters.currentWeek

            const validateWeek = (weeks) => {
                for (let i = 0; i < weeks.length; i++) {
                    if (weeks[i].length === 1 && +weeks[i][0] === +currentWeek) {
                        return true;
                    }
                    if (weeks[i].length === 2 && (weeks[i][0] <= currentWeek && weeks[i][1] >= currentWeek)) {
                        return true;
                    }
                }
                return false;
            }
            const validateSubgroup = (subgroup) => {
                if (this.filterSubgroup && subgroup) {
                    return subgroup === this.filterSubgroup
                }
                return true;
            }
            const validateChosenLesson = (chosenLesson) => {
                if (chosenLesson && this.filterChosenLesson) {
                    return chosenLesson === this.filterChosenLesson
                }
                return true;
            }
            const validateEvenOddWeek = (evenOdd) => {
                if (evenOdd && this.filterEvenOdd) {
                    return evenOdd.trim() === this.filterEvenOdd
                }
                return true;
            }

            const filtered = this.dayData.filter(item => {
                if (!item) return false;
                if (this.showAllSchedule) return true;
                if (!validateWeek(item.week)) return false;
                if (!validateSubgroup(item.subgroup)) return false;
                if (!validateEvenOddWeek(item.even_odd)) return false;

                return true;
            });
            return filtered.sort((a, b) => {
                return a.time.start.hours - b.time.start.hours
            })
        },
    },
}
</script>

<style lang="scss" scoped>
.item {
    &:deep(.line:not(.line_current)) {
        &:nth-child(even) {
            background: #D1E3F0;
        }
    }
    &:deep(.line_current) {
        background: #FFFACD;
    }
}
</style>
