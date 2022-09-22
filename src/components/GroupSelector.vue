<template>
    <div class="selector" v-show="isActive">
        <div class="selector__container">
            <button
                v-for="group in groups"
                class="selector__group"
                @click="chooseGroupName(group)"
            >{{ group }}</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "GroupSelector",
    props: ['isActive'],
    emits: ['handle-choose'],
    computed: {
        groups() {
            return this.$store.state.groups.groupNames;
        }
    },
    methods: {
        chooseGroupName(name) {
            this.$store.commit('setGroup', name)
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
    &__container {
        display: flex;
        flex-direction: column;
        gap: 8px 0;
    }
    &__group {
        font-size: 16px;
        padding: 10px 25px;
        transition: .3s all;
        &:hover {
            background: #D1E3F0;
        }
    }
}
</style>
