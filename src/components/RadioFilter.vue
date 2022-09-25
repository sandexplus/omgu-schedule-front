<template>
    <div class="radio">
        <p class="radio__label">{{ label }}</p>
        <div class="radio__items">
            <div
                :class="['radio__item', {'radio__item_active': active === item}]"
                v-for="item in data"
                :key="item"
                @click="itemClick(item)"
            >
                <div class="radio__square"></div>
                <p class="radio__item-text">{{ item }}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "RadioFilter",
    props: ['data', 'label'],
    computed: {
        active() {
            return this.$store.state.filters.subgroup ? this.$store.state.filters.subgroup : null
        }
    },
    methods: {
        itemClick(name) {
            this.$store.commit('setSubgroup', name);
            localStorage.setItem('subgroup', name)
        },
    },
    created() {
        if (localStorage.getItem('subgroup')) {
            this.$store.commit('setSubgroup', localStorage.getItem('subgroup'))
        }
    }
}
</script>

<style lang="scss" scoped>
.radio {
    align-self: flex-start;
    &__label {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 17px;
        color: #000000;
    }
    &__items {
        display: flex;
        gap: 12px;
        margin-top: 7px;
    }
    &__item {
        display: flex;
        align-items: center;
        gap: 4px;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 15px;
        line-height: 18px;
        color: #000000;
        cursor: pointer;
        &_active {
            & .radio__square {
                &:before {
                    content: '✓'
                }
            }
        }
    }
    &__square {
        width: 20px;
        height: 20px;
        background: #D9D9D9;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>
