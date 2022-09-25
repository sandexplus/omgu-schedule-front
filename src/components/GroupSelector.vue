<template>
    <div class="selector" v-show="isActive">
        <div class="selector__container">
            <div
                v-for="(group, i) in groups"
                class="selector__subgroup"
                @mouseover="selectedSubMenu = i"
                @mouseout="selectedSubMenu = null"
            >
                {{ i < groups.length - 1 ? `${i + 1} курс` : 'Магистратура' }}
                <div class="selector__groups">
                    <button
                        v-show="selectedSubMenu === i"
                        v-for="item in group"
                        class="selector__group"
                        @click="chooseGroupName(item, i)"
                    >{{ item }}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "GroupSelector",
    props: ['isActive'],
    emits: ['handle-choose'],
    data() {
        return {
            selectedSubMenu: null
        }
    },
    computed: {
        groups() {
            return this.$store.state.groups.groupNames;
        },
    },
    methods: {
        chooseGroupName(name, idx) {
            this.$store.commit('setGroup', name)
            this.$store.commit('setNumber', idx)
            this.$store.commit('setSelectedData')
            this.$store.dispatch('setChosenLessons')
            this.$emit('handle-choose')
        }
    }
}
</script>

<style lang="scss" scoped>
.selector {
    position: absolute;
    bottom: 0;
    left: 0;
    transform: translateY(100%);
    background: #fff;
    border-radius: 10px;
    padding: 15px 0;
    width: max-content;
    box-shadow: 0px 4px 4px rgb(0 0 0 / 25%);
    transition: .3s all;
    z-index: 99;
    &__container {
        display: flex;
        flex-direction: column;
        gap: 8px 0;
    }
    &__subgroup {
        font-size: 16px;
        padding: 10px 25px;
        transition: .3s all;
        cursor: pointer;
        position: relative;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        line-height: 17px;
        color: #000000;
        &:hover {
            background: #D1E3F0;
        }
    }
    &__groups {
        position: absolute;
        display: flex;
        background: #ffffff;
        top: 0;
        right: 1px;
        flex-direction: column;
        width: max-content;
        z-index: 100;
        transform: translateX(100%);
        box-shadow: 4px 4px 4px rgb(0 0 0 / 25%);
    }
    &__group {
        font-size: 16px;
        padding: 10px 25px;
        transition: .3s all;
        cursor: pointer;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        line-height: 17px;
        color: #000000;
        &:hover {
            background: #D1E3F0;
        }
    }
}
</style>
