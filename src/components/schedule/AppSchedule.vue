<template>
    <section class="schedule">
        <div class="container">
            <div class="schedule__inner">
                <schedule-item v-for="(item, i) in schedule" :day-data="item" :key="i" :day-index="i"></schedule-item>
            </div>
        </div>
    </section>
</template>

<script>
import ScheduleItem from "@/components/schedule/components/ScheduleItem";
export default {
    name: "AppSchedule",
    components: {ScheduleItem},
    computed: {
        group() {
            return this.$store.state.groups.selectedGroup
        },
        schedule() {
            if (this.$store.state.searchedData) {
                return this.$store.state.searchedData
            }
            return this.$store.getters.getScheduleByGroup(this.group)
        }
    },
}
</script>

<style lang="scss" scoped>
.schedule {
    margin-top: 15px;
    padding-bottom: 150px;
    &__inner {
        display: flex;
        flex-direction: column;
        gap: 30px;
    }
}
</style>
