<template>
    <app-header></app-header>
    <app-schedule></app-schedule>
</template>

<script>

import AppHeader from "@/components/AppHeader";
import AppSchedule from "@/components/schedule/AppSchedule";
export default {
    name: 'App',
    components: {AppSchedule, AppHeader},
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
