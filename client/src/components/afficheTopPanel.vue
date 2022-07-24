<template>
    <div class='topPanel'>
        <timeTable :today='today' @timeTableData='takeTimeTableData'/>
        <div style='display: flex'>
       <div class='filters' @click='openModalWindow'> Фильтры </div> 
        <div class='modalWindow' v-show='modalWindow'>
            <div class='modalWindow__filters'>
                <select v-model = 'byPrice' @change='filterByPrice' class='modalWindow__select'>
                    <option value='' class='modalWindow__select'> <span class='modalWindow__text'> По цене </span> </option>
                    <option v-for='filmInfo of filmsInfo' :value='filmInfo.price' :key='filmInfo.price' class='modalWindow__select'>
                       <span class='modalWindow__text'> {{filmInfo.price}} </span>
                    </option>
                </select>
            </div>
            <div class='modalWindow__filters'>
                <select v-model='byGenre' @change='filterByGenre' class='modalWindow__select'>
                    <option value='' > По жанру </option>
                    <option v-for='genre of genres' :value='genre' :key='genre'>
                        {{genre}}
                    </option>
                </select>
            </div>
        </div> 
         </div>
    </div>
</template>

<script>
import timeTable from '@/components/timeTable';


export default {
    name: 'afficheTopPanel',
    components: {
        timeTable,
    },
    data() {
        return {
            modalWindow: false,
            genres: ['Ужасы', "Триллер", "Комедия", "Боевик", "Приключения", "Фантастика", "Криминал", "Фентези"],
            byPrice: '',
            byGenre: '',
            today: null,
        }
    },
    props: {
        filmsInfo: {
            type: Object
        }
    },
    created() {
        this.today = new Date()
    },
    methods: {
        openModalWindow() {
            this.modalWindow = !this.modalWindow
        },
        
        filterByPrice() {
            this.$emit('filterByPrice', {
                byPrice: this.byPrice
                })
        },
        filterByGenre() {
            this.$emit('filterByGenre', {
                byGenre: this.byGenre
                })
        },

        sendParamsFiltration(event) {
            this.$emit('sendParamsFiltration', {
                param: event.target.value
                })
            },

        takeTimeTableData(obj) {
            this.$emit('timeTableDataToCard', obj)
        }
        
    }
}
</script>

<style lang='sass' scoped>
.topPanel
    width: 80%
    margin: 10px 0px
    box-sizing: border-box
    display: flex
    justify-content: flex-center
    align-content: flex-start
    position: relative
    background: rgb(15, 30, 55)
    @media screen and (max-width: 1000px)
        width: 80%
        margin: 0px auto
    @media screen and (max-width: 600px)
        width: 100%

.filters
    position: relative
    display: flex
    justify-content: center
    align-items: center
    font-size: 18px
    color: white
    background-color: rgb(15, 30, 55)
    padding: 10px 10px
    margin: 20px 50px
    height: 40px
    box-sizing: content-box
    font-weight: bold
    border: 1px solid white
    transition: background-color 0.5s
    &:hover
        background-color: #F7CA18
        cursor: pointer
        transition: background-color 0.5s
    @media screen and (max-width: 600px)
        margin: 20px 10px

.modalWindow
    display: block
    max-width: 300px
    width: 300px
    min-width: 100px
    background-color: #2d3c55
    background-color: 15, 30, 55
    border: 2px solid orange
    position: absolute
    z-index: 400
    top: 100%
    right: 0
    

.modalWindow__filters
    margin: 30px 15px

.modalWindow__select
        width: 100%
        height: 30px
        padding: 5px
        box-sizing: border-box
        text-align: left
        border-radius: 5px
        font-size: 14px
        font-weight: bold
        border: 1px solid black
        &:hover
            border-color: orange
.modalWindow__text
        padding: 15px
            
    
    
</style>