<template>
    <div class="dropdown">
        <p class="dropdown__title">Предмет по выбору</p>
        <div class="dropdown__inner" v-click-outside="closeDropdown">
            <div class="dropdown__placeholder button" @click="openDropdown">
                {{ selectedData }}
                <svg width="10" height="5" viewBox="0 0 10 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H10L5 5L0 0Z" fill="black"/>
                </svg>
            </div>
            <div class="dropdown__values" v-show="dropDownOpened">
                <button
                    v-for="item in data"
                    class="dropdown__value"
                    @click="selectLesson(item)"
                >
                    {{ item }}
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "DropdownFilter",
    props: ['data'],
    data() {
        return {
            dropDownOpened: false
        }
    },
    computed: {
        selectedData() {
            return this.$store.state.filters.chosenLesson ? this.$store.state.filters.chosenLesson : 'Выберите предмет по выбору'
        }
    },
    methods: {
        openDropdown() {
            this.dropDownOpened = true;
        },
        closeDropdown() {
            this.dropDownOpened = false;
        },
        selectLesson(name) {
            this.$store.commit('setChosenLesson', name)
            this.closeDropdown()
        }
    },
    created() {
        if (localStorage.getItem('chosenLesson') !== 'null') {
            this.$store.commit('setChosenLesson', localStorage.getItem('chosenLesson'))
        }
    }
}
</script>

<style lang="scss" scoped>
.dropdown {
    &__title {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 17px;
        color: #000000;
        text-align: center;
    }
    &__inner {
        position: relative;
        margin-top: 7px;
    }
    &__placeholder {
        background: #D9D9D9;
        width: 315px;
        padding: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 17px;
        color: #000000;
    }
    &__values {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        transform: translateY(100%);
        background: #fff;
        z-index: 98;
        box-shadow: 0px 4px 4px rgb(0 0 0 / 25%);
    }
    &__value {
        padding: 10px;
        transition: .3s all;
        width: 100%;
        text-align: left;
        &:hover {
            background: rgba(0,0,0,.1);
        }
    }
}
</style>
