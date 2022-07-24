<template>
        <div class='timeTable'>
            <timeTableElem v-for='day of days' :key = 'day' :today = 'today' :day = 'day' @emitDate='setDateString' :class="['timeTableElem', {active: currentTab === day}]"/>
            <timeTableMenu @emitDate='setDateString' class='timeTableMenu'/>
        </div>
        <!-- <div v-if='sessions'>
            <actualSessions :filmSessions='filmSessions' :dateString='dateString'/>
        </div> -->
</template>

<script>
import timeTableElem from './timeTable-elem'
import timeTableMenu from './timeTableMenu'
// import actualSessions from './ActualSessions.vue'


export default {
    name: 'timeTable',
    components: {
        timeTableElem,
        timeTableMenu,
        // actualSessions, 
    },

    props: ['today', 'filmSessions'],
    provide() {
        return {
            provideToday: this.today,
            // infoAboutFilmName: this.filmName
        }
    },
    data() {
        return {
            days: 5,
            dateString: null,
            sessions: false,
            currentTab: 1,
        }
    },
    methods: {
        setDateString(obj) {
            let vm = this
            vm.dateString = obj.dateString;
            vm.sessions = true;
            vm.currentTab = obj.day;
            vm.$emit('timeTableData', {
                sessions: vm.sessions,
                dateString: vm.dateString
            })
        }
    }
}
</script>

<style lang='sass' scoped>
.timeTable
    display: flex
    background-color: rgb(15, 30, 55)
    padding: 20px 0px
    @media screen and (max-width: 1000px)
        display: flex
        justify-content: flex-start
        align-items: flex-start
    @media screen and (max-width: 600px)
        display: flex
        justify-content: center
        align-items: center

.timeTableElem
    background-color: rgb(15, 30, 55)
    color: white
    width: 100px
    @media screen and (max-width: 600px)
        display: none

.timeTableMenu
    background-color: rgb(15, 30, 55)
    @media screen and (max-width: 600px)
        display: flex
        justify-content: flex-start
        align-items: flex-start

.timeTableElem.active
    background-color: gray

@media screen and (max-width: 1000px)
    button:nth-last-child(-n+2)
        display: none

    button:nth-last-child(-n+3)
        display: none

@media screen and (max-width: 733px)
    button:nth-last-child(-n+4)
        display: none

@media screen and (max-width: 533px)
    button:nth-last-child(-n+5)
        display: none

@media screen and (max-width: 332px)
    button:nth-last-child(-n+6)
        display: none

</style>
