<template>
<div>
    <button class='timeTableElem' @click='callCalendar()'> {{message}} </button>
    <div v-if='isHidden' class='timeTableElemCalendar'>
        <Calendar class='calendar' @chooseDay="setDay"/>
    </div>
</div>
    
</template>

<script>
import Calendar from './Calendar'

export default {
    name: 'timeTableMenu',
    data() {
        return {
            message: 'Выберите дату',
            isHidden: false,
            months: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
        }
    },
    inject: ['provideToday'],
    components: {
        Calendar,
    },
    
    methods: {
        setDay(obj) {
            let object = obj;
            this.message = object.day + ' ' + this.months[object.month];
            let year = this.provideToday.getFullYear();
            let actualDate = year + '-' + object.month + '-' + object.day
            this.$emit('emitDate', {
                                dateString: actualDate
                                    })
        },

        callCalendar() {
            this.isHidden = !this.isHidden;
        }
    }
}
</script>

<style lang = 'sass' scoped>
.timeTableElem
    padding: 10px
    display: flex
    justify-content: center
    align-items: center
    background-color: rgb(15, 30, 55)
    color: white
    border: solid 1px white
    width: 100%
    height: 40px
    font-weight: bold
    font-size: 20px
    box-sizing: content-box
    &:hover
        background: gray

.calendar
    display: block
    position: absolute
    z-index: 500


</style>