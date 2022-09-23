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
    created() {
        this.$store.dispatch('setData').then(res => {
            if (res !== '200')
                return
            if (!localStorage.getItem('selectedGroup')) {
                const schedule = this.$store.state.data
                const firstGroup = Object.keys(schedule)[0]
                this.$store.commit('setGroup', firstGroup)
            } else {
                const group = localStorage.getItem('selectedGroup');
                this.$store.commit('setGroup', group)
            }
        })

    }
}
</script>

<style lang="scss">
@import "assets/style/commons";
</style>
