<template>
    <section class="filters">
        <div class="container">
            <div class="filters__inner">
                <radio-filter :data="radioFilters" label="Подгруппа"></radio-filter>
                <dropdown-filter v-if="chosenLessons.length" :data="chosenLessons"></dropdown-filter>
                <show-all-filter></show-all-filter>
            </div>
        </div>
    </section>
</template>

<script>
import RadioFilter from "@/components/RadioFilter";
import DropdownFilter from "@/components/DropdownFilter";
import ShowAllFilter from "@/components/ShowAllFilter";
export default {
    name: "AppFilters",
    components: {ShowAllFilter, DropdownFilter, RadioFilter},
    data() {
        return {
            radioFilters: ['1', '2']
        }
    },
    computed: {
        chosenLessons() {
            return this.$store.state.groups.chosenLessons;
        },
    },

}
</script>

<style lang="scss" scoped>
.filters {
    padding: 15px 0;
    &__inner {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
    }
}
</style>
