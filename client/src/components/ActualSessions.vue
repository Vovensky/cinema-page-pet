<template>
<div>
    <div class='sessions_container'>
        <div class='sessions_container__item' v-for='session of actualSessions()' :id = 'session'
        :key ='session' 
        @click='callModalWindow($event)'> {{session}}</div>
    </div>
    <div v-if='modalWindow'>
        <audiTorium :dateString = 'dateString' :timeOfSession = 'timeOfSession' :filmNamed = 'filmName' @closeModalWindow='closeModalWindow'/>
    </div>
</div>
</template>

<script>

import {mapGetters} from 'vuex';
import audiTorium from './Auditorium'
export default {
    props: ['filmSessions', 'dateString', 'today', 'filmName'],
    // inject: ['provideToday'],
    components: {
        audiTorium
    },
    data() {
        return {
            modalWindow: false
        }
    },
    methods: {
        actualSessions() {
            let date = this.today
            let dayOfMonth = date.getDate()
            let month = date.getMonth()
            let hour = date.getHours()
            let minutes = date.getMinutes()
            let clickedDay = this.dateString.split('-')
            let clickedMonth = clickedDay[1]
            let clickedDate = clickedDay[2]
            const actualSessions = this.filmSessions.filter( (session) => {
                let sessionTime = session.split(':');
                if(dayOfMonth == clickedDate) {
                    if(sessionTime[0] > hour) {
                        return true
                    } else if(sessionTime[0] == hour) {
                        return sessionTime[1] > minutes ? true : false
                    } else { return false }

                } else if(clickedDate > dayOfMonth || clickedMonth > month) {
                    return true
                } else { return false }
            })
            return actualSessions
        },

        callModalWindow(event) {
            this.timeOfSession = event.target.id
            this.modalWindow = true;
        },

        closeModalWindow() {
            this.modalWindow = false;
        }


    },
    computed: {
        ...mapGetters({
            getMocks: 'films/getMocks'}),
        getSessions() {
            return this.getMocks
        }
    }
}
</script>

<style lang='sass' scoped>
.sessions_container
    margin: 10px 0px
    display: flex
    flex-wrap: wrap
    @media screen and (max-width: 600px)
        align-items: center
        justify-content: center

.sessions_container__item
    width: 120px
    height: 60px
    margin: 5px 5px 
    border: 1px solid rgb(36, 70, 64)
    color: white
    display: flex
    align-items: center
    justify-content: center
    transition: margin-top 0.5s
    &:hover
        cursor: pointer
        background: gray
        margin-top: -10px
    &:focus
        background: gray
    
</style>
