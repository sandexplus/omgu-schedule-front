<template>
    <div class="show-all">
        <button @click="clearFilters" class="show-all__clear-filters">Сбросить фильтры</button>
        <button @click="toggleShowAll" class="show-all__show-all button">Показать {{ !showAll ? 'все' : 'активное' }} расписание</button>
    </div>
</template>

<script>
export default {
    name: "ShowAllFilter",
    computed: {
        showAll() {
            return this.$store.state.filters.showAllSchedule;
        },
    },
    methods: {
        toggleShowAll() {
            this.$store.commit('setShowAll');
        },
        clearFilters() {
            this.$store.commit('setSubgroup', null);
            this.$store.commit('setChosenLesson', null)
        }
    }
}
</script>

<style lang="scss" scoped>
.show-all {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 7px;
    &__clear-filters {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 17px;
        color: #7D7F7D;
    }
    &__show-all {
        padding: 10px;
        background: #D9D9D9;
    }
}
</style>
