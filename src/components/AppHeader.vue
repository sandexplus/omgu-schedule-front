<template>
    <header class="header">
        <div class="container">
            <div class="header__inner">
                <h1 class="header__title">{{ group }}</h1>
                <div class="header__selector">
                    <button @click="showSelector" class="header__change-group">Сменить группу</button>
                    <group-selector
                        @handle-choose="closeSelector"
                        :is-active="selectorActive"
                    ></group-selector>
                </div>

            </div>

        </div>
    </header>
</template>

<script>
import GroupSelector from "@/components/GroupSelector";
export default {
    name: "AppHeader",
    components: {GroupSelector},
    data() {
        return {
            selectorActive: false
        }
    },
    computed: {
        group() {
            return this.$store.state.groups.selectedGroup
        }
    },
    methods: {
        showSelector() {
            this.selectorActive = true;
        },
        closeSelector() {
            this.selectorActive = false;
        }
    }
}
</script>

<style lang="scss" scoped>
.header {
    width: 100vw;
    height: 150px;
    background: #B0C4DE;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    display: flex;
    align-items: center;
    padding: 0 100px;
    &__selector {
        position: relative;
    }
    &__inner {
        display: flex;
        align-items: flex-end;
        gap: 3px;
    }
    &__title {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 600;
        font-size: 28px;
        line-height: 34px;
        color: #000000;
    }
    &__change-group {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 600;
        font-size: 15px;
        line-height: 18px;
        color: #7D7F7D;
        margin-bottom: 2px;
    }
}
</style>
