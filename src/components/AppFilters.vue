<template>
    <section class="filters">
        <div class="container">
            <radio-filter :data="radioFilters" label="Подгруппа"></radio-filter>
        </div>
    </section>
</template>

<script>
import RadioFilter from "@/components/RadioFilter";
export default {
    name: "AppFilters",
    components: {RadioFilter},
    data() {
        return {
            radioFilters: ['1', '2']
        }
    },
}
</script>

<style lang="scss" scoped>
.filters {
    padding: 15px 0;
}
</style>
