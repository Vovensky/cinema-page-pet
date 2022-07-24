<template>
<div class='filmPage_container'>
    <div class='filmInfo_container' v-if='film'>
        <div class ='filmInfo'>
            <div class='filmInfo_mainContent'>
                <div class='filmInfo_mainContent__filmTitle'>
                    <div class='filmInfo_mainContent__title'> {{film.name}} </div>
                    <!-- <div class='filmInfo_mainContent__image' :style="{backgroundImage:`url(${film.img})`}"></div> -->
                    <img :src='film.img' class='filmInfo_mainContent__image'/>
                </div>
                <div class='filmInfo_mainContent__description'>
                    <div class='filmInfo_mainContent__description-frame'>
                        <div class='filmInfo_mainContent__description-block'> <span class = 'filmInfo_mainContent__description-grapgh'> Описание: </span> <br> {{film.title}} </div> 
                        <div class='filmInfo_mainContent__description-block'> <span class = 'filmInfo_mainContent__description-grapgh'> Актеры: </span> {{film.actors}} </div> 
                        <div class='filmInfo_mainContent__description-block'> <b class = 'filmInfo_mainContent__description-grapgh'> Режиссеры: </b> {{film.director}} </div>
                    </div>
                </div>
            </div>
        </div>
        <div class='timeTable'>
            <h3> Расписание сеансов: </h3>
            <timeTable :today='today'
            @timeTableData='takeTimeTableData' />
            <actualSessions :filmSessions='film.sessions' :dateString='computedDate' :today='today' :filmName = 'film.name' />
        <div>
       <p>Оставьте отзыв:</p>
            <!-- <ul> 
                <li v-for="reaction in reactions" :key="reaction.id">
                    <button type="button" class="timeTable__reactions">
                        {{ reaction.title }}
                    </button>
                </li>
            </ul>  -->
        </div> 
        <Commentaries/> 
        </div>
        
    </div>  
</div>
    
</template>

<script>
// import films from '../mocks/mocks.js'
import timeTable from '@/components/timeTable';
import Commentaries from '@/components/Commentaries'
import {mapGetters} from 'vuex';
import actualSessions from '@/components/ActualSessions.vue'

export default {
    
    components: {
        timeTable,
        Commentaries,
        actualSessions
    },
    // provide() {
    //     return {
    //         filmName: film.name
    //     }
    // },
    data() {
        return {
            today: null,
            openWindow: false,
            dateString: null,
            sessions: false,
        }
    },
    created: 
        function() {
            this.today = new Date(); 
            console.log(this.$route.params)
        }
    ,
    computed: {
        ...mapGetters({
            getReactions: 'reactions/getReactions', 
            getMocks: 'films/getMocks'}),
        reactions() {
            return this.getReactions;
        },
        films() {
            return this.getMocks 
        },
        film() {
            const film = this.films.find(film => film.id == this.$route.params.id)
            if (film) {
                return film
            }
            return null;
        },

        computedDate() {
            let vm =this
            let date = null
            if(!vm.dateString) {
                let year = vm.today.getFullYear();
                let month = vm.today.getMonth();
                let todayDate = vm.today.getDate();
                date = year + '-' + month + '-' + todayDate;
            } else {
                date = vm.dateString
            }
            return date
        }
    },

    methods: {
        takeTimeTableData(obj) {
            let vm = this
            vm.sessions = obj.sessions
            vm.dateString = obj.dateString
        },


    }
   
}
</script>

<style lang = 'sass' scoped>
.filmPage_container
    width: 100%
    box-sizing: border-box
    color: white
    @media screen and (max-width: 1000px)
        width: 80%
        margin: 0px auto

    @media screen and (max-width: 1800px)
        width: 80%
        margin: 0px auto

    .filmInfo_container
        position: relative
        width: 80%
        margin-left: auto 
        margin-right: auto

    .filmInfo
        position: relative
        display: flex
        width: 100%
        animation-duration: 5s;
        animation-name: slidein;

    .filmInfo_mainContent
        position: relative
        display: flex
        
    .filmInfo_mainContent__filmTitle
        position: relative
        display: flex

    .filmInfo_mainContent__image
        width: 100%
        height: 100%
       
    .filmInfo_mainContent__description
        position: relative
        top: 0
        right: 0
        overflow-y: auto
        width: 30rem
        min-width: 20rem
        display: flex
        background-color: black
        padding-left: 10px
        background-color: rgba(0,0,0,0.3)
        
    .filmInfo_mainContent__description::-webkit-scrollbar 
        width: 10px;
        height: 10px

    .filmInfo_mainContent__description::-webkit-scrollbar-track
        background: #0f1e37

    .filmInfo_mainContent__description::-webkit-scrollbar-thumb
        background-color: #0f1e37
        border-radius: 20px
        border: 1px solid white

    .filmInfo_mainContent__description-frame
        padding: 20px 5px
        height: 700px
        box-sizing: border-box

    .filmInfo_mainContent__description-block
        text-align: left
        font-size: 24px
        margin-bottom: 10px
        font-weight: bold
        line-height: 2rem
        opacity: 1

    .filmInfo_mainContent__description-grapgh
        font-weight: bold
        color: orange
        
    .filmInfo_mainContent__title 
        font-size: 48px
        font-weight: bold 
        padding: 40px 40px 40px 0px
        box-sizing: border-box
        text-align: right
        width: 100%
        position: absolute
        left: 0
        top: 0
        background: linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 15%)

    .timeTable p
        text-align: left
        font-size: 24px
        margin-bottom: 10px
        font-weight: bold
        line-height: 2rem
        opacity: 1
    
    .timeTable
        width: 100%
        max-width: 1000px

    .timeTable h3
        color: rgb(255,255,255)
        font-size: 32px
        font-weight: bold
        text-align: left
        
    .timeTable ul 
        padding-left: 0
        list-style: 0
        display: flex
        top: 0
        justify-content: left
        align-items: center
        li
            list-style: none

    .timeTable__reactions 
        width: 40px
        height: 20px
        border-radius: 5px
        margin-right: 1.5px
        background-color: orange;
        &:hover
            opacity: 0.6

    @keyframes slidein 
        from 
            opacity: 0

        to 
            opacity: 1

    @media screen and (max-width: 1800px)
        .filmInfo_mainContent
            display: block
            

        .filmInfo_mainContent__image
            width: 100%

        .filmInfo_mainContent__description
            width: 100%
            background-color: rgba(0,0,0,0)

        .filmInfo_mainContent__description-frame
            height: auto
            padding: 0
            margin: 0

        .filmInfo_container
            width: 100%
            margin: 0
            


</style>