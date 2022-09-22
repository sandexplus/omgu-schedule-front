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
export default {
    name: "ScheduleItem",
    components: {ScheduleLine, ScheduleHeader},
    props: ['dayIndex', 'dayData'],
    computed: {
        exactDayOfWeek() {
            return this.$store.getters.getExactDayOfWeek(this.dayIndex)
        },
        isToday() {
            const days = this.$store.state.days.daysOfWeek;
            const arrayOfDaysValues = Object.values(days);
            return arrayOfDaysValues[new Date().getDay()] === this.exactDayOfWeek
        },
        filteredSchedule() {
            return this.dayData.filter(item => item);
        }
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
