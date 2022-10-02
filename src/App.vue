<template>
    <app-header></app-header>
    <app-filters></app-filters>
    <app-schedule></app-schedule>
</template>

<script>

import AppHeader from "@/components/AppHeader";
import AppSchedule from "@/components/schedule/AppSchedule";
import AppFilters from "@/components/AppFilters";
export default {
    name: 'App',
    components: {AppFilters, AppSchedule, AppHeader},
    async created() {
        await this.$store.dispatch('setData')
        if (!localStorage.getItem('selectedGroup')) {
            const schedule = await this.$store.state.selectedData
            const firstGroup = Object.keys(schedule)[0]
            this.$store.commit('setGroup', firstGroup)
        } else {
            const group = localStorage.getItem('selectedGroup');
            this.$store.commit('setGroup', group)
        }
        if (localStorage.getItem('search')) {
            this.$store.dispatch('setSearchedString', localStorage.getItem('search'))
        }
        this.$store.dispatch('setChosenLessons')
    }
}
</script>

<style lang="scss">
@import "assets/style/commons";
</style>
