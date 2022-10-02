<template>
    <div class="search">
        <input type="text" class="search__input" v-model="searchString">
        <button class="search__btn" @click="saveSearch">Сохранить поиск</button>
    </div>
</template>

<script>
export default {
    name: "AppSearch",
    props: ['modelValue'],
    emits: ['update:modelValue', 'handle-search'],
    data() {
        return {
            searchString: ''
        }
    },
    methods: {
        saveSearch() {
            localStorage.setItem('search', this.searchString);
        }
    },
    watch: {
        searchString(val) {
            this.$store.dispatch('setSearchedString', val);
        }
    }
}
</script>

<style lang="scss" scoped>
.search {
    display: flex;
    align-items: center;
    gap: 15px;
    &__input {
        width: 200px;
        height: 30px;
        padding-left: 15px;
    }
}
</style>
