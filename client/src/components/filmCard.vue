<template>
<div>
    <div class='filmcard'>
        <div class='filmcard_visual'>
            <img :src= 'film.img'  :alt='film.name' class='filmcard_information__image'>
            <router-link class = 'filmcard_visual__router' :to="{ name: 'filmPage', params: { id: film.id } }"> <b> Подробнее о фильме </b> </router-link> 
            <div class='filmcard_visual__rating' > {{film.rating}} </div>
        </div>
        <div class='filmcard_information'>
            <h1 class='filmcard_information__content'>  <router-link class = 'filmcard_information__content' :to="{ name: 'filmPage', params: { id: film.id } }"> {{film.name}}  </router-link> </h1>
            <div class='filmcard_information__info'> 
                <div class='filmcard_information__info-age'> 16+ </div>
                <div class='filmcard_information__additional-info'>
                    <div>{{filmGenre}} </div>
                    <div>Длительность</div>
                </div>
            </div>
            <div class='filmcard_information__actualSessions'>
                <actualSessions :filmSessions='film.sessions' :dateString='computedDate' :filmName='film.name' :today='today'/>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex';
import actualSessions from './ActualSessions.vue'

export default {
    name: 'filmCard',
    props: ['film', 'sessions', 'dateString', 'today'],
    components: {
        actualSessions,
    },
    data() {
        return {
            date: null
        }
    },
    
    computed: {
        ...mapGetters({
            getReactions: 'reactions/getReactions'}),
        reactions() {
            return this.getReactions;
        },
        filmGenre() {
            let vm = this
            return vm.film.genre.split(' ').join(', ')
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

    }
}
</script>

<style lang='sass' scoped>
.filmcard
    position: relative
    display: flex
    @media screen and (max-width: 1000px)
        display: block
        width: 80%
        margin: 0px auto

    @media screen and (max-width: 600px)
        display: block
        width: 100%
        margin: 0px

    .filmcard_information
        position: relative
        width: 60%
        margin-left: 10px
        box-sizing: border-box
        @media screen and (max-width: 1000px)
            width: 100%
            margin: 0

    .filmcard_information__info
        width: 100%
        color: rgb(255,255,255)
        display: flex
        justify-content: flex-start
        align-items: flex-start
        padding: 10px
        font-weight: bold
        font-size: 12px

    .filmcard_information__info-age
        width: 36px; 
        height: 36px; 
        border: 2px solid yellow; 
        border-radius: 50%;
        display: flex
        justify-content: center
        align-items: center

    .filmcard_information__actualSessions
        display: block

    .filmcard_information__content
        position: relative
        top: 0
        left: 0
        width: 100%
        color: #ffffff
        height: 50px
        background: linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 95%)
        font-weight: 700
        padding: 20px 10px
        font-size: 30px
        margin: 0
        text-decoration: none
        text-align: left
        @media screen and (max-width: 1000px)
            background: black
            box-sizing: content-box
            padding: 20px 0px

    .filmcard_information__image
        border-radius: 10px 10px 10px 10px
        width: 100%
        height: 300px

    .filmcard_information__additional-info
        display:block 
        text-align: left 
        padding: 0px 10px

    .filmcard_visual
        width: 40%
        height: 100%
        position: relative
        @media screen and (max-width: 1000px)
            width: 100%
            

    .filmcard_visual__rating
        position: absolute
        background-color: orange
        width: 100px
        height: 50px
        font-weight: 700
        text-align: left
        right: 0;
        top: 0;
        display: flex
        justify-content: center
        align-items: center
        color: #ffffff
        font-weight: 700
        font-size: 20px
        border-radius: 0 10px 0 10px
        opacity: 0.8
        &:hover
            opacity: 1

    .filmcard_visual__router
        position: absolute
        top: 0
        left: 0
        bottom: 0
        right: 0
        border-radius: 10px
        background-color: rgba(0, 0, 0, 0.6)
        color: #ffffff
        display: flex
        justify-content: center
        align-items: center
        font-weight: 700
        font-size: 30px
        text-decoration: none
        opacity: 0
        transition: all 0.2s ease
        &:hover, &:focus
            opacity: 1



    

</style>
