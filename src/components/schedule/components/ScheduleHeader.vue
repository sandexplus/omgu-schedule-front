<template>
    <div class="header">
        <div
            :class="['header__day', {'header__day_today': isToday}]"
        >{{ weekDay }}</div>
        <div class="header__info-table">
            <p>№</p>
            <p>Тип</p>
            <p>П/Г</p>
            <p>Время</p>
            <p>Предмет</p>
            <p>Аудитория</p>
            <p>Преподаватель</p>
        </div>
    </div>
</template>

<script>
export default {
    name: "ScheduleHeader",
    props: ['isToday', 'weekDay'],
}
</script>

<style lang="scss" scoped>
.header {
    width: 100%;
    &__day {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 500;
        font-size: 28px;
        line-height: 34px;
        color: #000000;
        padding: 18px 15px;
        background: #B0C4DE;
        &_today {
            background: #FCFBB1;
        }
    }
    &__info-table {
        width: 100%;
        background: #FFFFFF;
        display: grid;
        grid-template-columns:  1fr 1fr 1fr 2fr 3fr 2fr 3fr;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        @media (max-width: 1000px) {
            grid-template-columns: 1fr 1fr 2fr 3fr 2fr 3fr;
        }
        & p {
            font-family: 'Inter';
            font-style: normal;
            font-weight: 600;
            font-size: 15px;
            line-height: 18px;
            color: #000000;
            padding: 16px 15px;
            &:first-child {
                @media (max-width: 1000px) {
                    display: none;
                }
            }
        }
    }
}
</style>
