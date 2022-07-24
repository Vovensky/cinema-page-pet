<template>
<div>
    <div class='filmList'>
        <div> <h1> Сейчас на экранах </h1></div>
        <!-- <div> <h1>Сейчас на экранах </h1></div> -->
    </div>
    <afficheTopPanel :filmsInfo = 'films' 
    @filterByPrice='setPrice' 
    @filterByGenre='setGenre'
    @timeTableDataToCard='dataToFilmCard'
    />
    <!-- <div v-if='filteredFilms'>
        <filmCard class='container' v-for='(film, index) of filteredFilms' :key = 'index' :film = 'film'></filmCard>
    </div>
    <div v-else>
        <filmCard class='container' v-for='(film, index) of films' :key = 'index' :film = 'film'></filmCard>
    </div> -->
        <filmCard class='filmList__filmCard' 
        v-for='film of filteredFilms' 
        :key='film' 
        :film='film'
        :dateString='dateString'
        :today='today'
        :sessions='sessions'
       ></filmCard>
</div>
</template>

<script>
import filmCard from './filmCard'
import afficheTopPanel from './afficheTopPanel.vue'

export default {
    name: 'filmList',
    components: {
        filmCard,
        afficheTopPanel
    },
    data() {
        return {
            byPrice: '',
            byGenre: '',
            sessions: false,
            dateString: null,
            today: null,
        }
    },
    props: ['films'],
    created() {
        let vm = this
        vm.today = new Date()
        if(vm.filteredFilms.length == 0) {
            vm.filteredFilms = null
        }
    },
    computed: {
        filteredFilms() {
            let vm = this;
            let filteredFilms = [...vm.films];
            
            if(vm.byPrice || vm.byGenre) {
                if(vm.byPrice) {
                    filteredFilms = filteredFilms.filter( (film) => film.price == vm.byPrice)
                }
                if(vm.byGenre) {
                    filteredFilms = filteredFilms.filter( (film) => {
                        let arr = film.genre.split(' ')
                        return arr.includes(vm.byGenre) ? true : false
                    })
                }
            }
            return filteredFilms
        }
    },

    methods: {
        setPrice(obj) {
            this.byPrice = obj.byPrice
        },
        setGenre(obj) {
            console.log(`byGenre: ${obj.byGenre}`)
            this.byGenre = obj.byGenre
        },
        dataToFilmCard(obj) {
            let vm = this
            vm.sessions = obj.sessions
            vm.dateString = obj.dateString
        }
    },
}
</script>

<style lang='sass' scoped>
.filmList 
    position: relative
    width: 80%
    margin-left: auto 
    margin-right: auto

.filmList  div
    position: relative
    width: 80%
    margin-left: auto 
    margin-right: auto
    font-size: 36px
    color: white

.filmList div:nth-child(1)
    -webkit-text-stroke: 2px #03a9f4
    color: transparent
    @media screen and (max-width: 1200px) 
        width: 100%

.filmList div:nth-child(2)
    color: #03a9f4
    animation: animate 4s ease-in-out infinite

.filmList__filmCard
    width: 100%
    display: block

@keyframes animate
    0%, 100%
        clip-path: polygon(0% 45%, 15% 44%, 32% 50%,
        54% 60%, 70% 60%, 84% 59%, 100% 52%, 100% 100%, 0% 100%)
    50%
        clip-path: polygon(0% 60%, 16% 65%, 34% 66%,
        51% 62%, 67% 50%, 84% 45%, 100% 46%, 100% 100%, 0% 100%)





</style>
