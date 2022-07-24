<template>
<div class='buy_tickets_window' v-if='data'>
    <div class='buy_tickets_frame'>
        <div class='movie_hall'>
                <div class='movie_header'>
                    <div class='movie_header__info'>
                            <div class='movie_header__session'> 
                                <div class='movie_header__session-time'>
                                <div class='movie_header__session-item'> {{filmNamed}}</div>
                                <div class='movie_header__session-item'> 
                                   Сеанс состоится  {{clickedDate}}, {{actualMonth}} в {{timeOfSession}}</div>
                                </div>
                            </div>
                        <button class='movie_header__close-button' 
                        type='button' @click='closeModalWindow'> X </button>
                    </div>
                </div>
                <div class='movie_body'>
                    <div class='body_container'> 
                            <div class='body_hall'> 
                                <div class='body_hall_background'> 
                                    <div class='body_hall__rows'> 
                                        <div class='body_hall__row' v-for='row of rows' :key='row'> 
                                            <div class='body_hall__row-left' :style='generateLeftRow(row)'> {{row}}</div> 
                                            <div class='body_hall__row-right' :style='generateRightRow(row)'> {{row}}</div> 
                                        </div>
                                    </div> 
                                    <div class='body_hall__cols'>
                                        <div v-for='(row, topIndex) in chosenSeats' :key= 'topIndex'>
                                            <div v-for='(bool, index) of row' :key='index' :style='generateStyleSeat(index, topIndex)' :class="bool ?  'body_hall__chosenSeat' : 'body_hall__seats'" @click='chooseSeats(row, bool, index, topIndex)'>
                                                {{index + 1}}
                                            </div>
                                        </div>   
                                    </div> 
                                </div>
                            </div>
                    </div>
                </div>
                <div class='movie_footer'>
                    <button class='movie_footer__buyButton' @click='sendBoughtTicketsAtServer'>Купить</button>
                </div>
            </div>
        </div> 
    </div>
</template> 

<script>
export default {
    name: 'audiTorium',
    props: ['dateString', 'timeOfSession', 'filmNamed'],
    data() {
         return {
             seats: [5,6,7],
             chosenSeats: {},
             objToServer: {
                filmName: this.filmNamed,
                time: this.timeOfSession,
                date: this.dateString,
                seats: {}
             },
             data: null,
             i: 1,
             rows: 1,
             actualMonth: null,
             active: false
         }
     },
    created:
        async function() {
            let vm = this
            vm.rows = vm.seats.length
            let seats = vm.seats
            let obj = vm.objToServer
            let filmName = vm.filmNamed
            let date = vm.dateString
            let time = vm.timeOfSession
            for(let i = 0; i < vm.rows; i++) {
                let length = seats[i];
                vm.chosenSeats[i] = Array(length).fill(false);
                obj.seats[i] = []
            }
            let months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"]
            let month = vm.dateString.split('-')
            vm.actualMonth = months[month[1]]
            vm.clickedDate = month[2]
            this.data = await vm.fetchTickets(filmName, date, time)
            console.log(this.data)
        },
    
    methods: {
        fetchTickets(filmName, date, time) {
            console.log(`FILMNAME: ${filmName}`)
            console.log(`DATE: ${date}`)
            console.log(`TIME: ${time}`)
            let response = fetch('http://localhost:8000/getBoughtTickets', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({filmName,
                                    time,
                                    date,})
            }).then(response => {
                if(response.status == 200) {
                    return response.json()}
                    else {
                        return response.text()
                    }})
            return response
        },

        chooseSeats(arr, boolean, index, topIndex) {

            let vm = this;
            let array = vm.data[topIndex]
            if(array) {
                if(array.includes(index)) {
                    console.log("уже занято")
                    return  
                }
            }
            vm.changeStyle(arr, index, boolean)
            vm.pickUpInfo(index, topIndex)
        },

        // функция отправляющая собирающие данные для отправки на серв
        pickUpInfo(value, row) {
            let vm = this
            let obj = vm.objToServer
            let seats = obj.seats
            let arr = seats[row];
            let index = arr.indexOf(value)
            if(index == -1) {
                arr.push(value)
            } else {
                arr.splice(index, 1)
            }
            seats[row] = arr;//собираем объект с именем, датой, сеансом и выбранными местами после чего отправляем на сервер.
            console.log(arr)
        },

        sendBoughtTicketsAtServer() {
            fetch('http://localhost:8000/boughtTicket', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.objToServer)
            })
           this.closeModalWindow();
        },
        // функция меняющая значение переменной и устанавливающая стиль для выбранных мест
        changeStyle(arr, index, value) {
            arr[index] = !value
        },

        closeModalWindow() {
            this.$emit('closeModalWindow')
        },

        generateLeftRow(row) {
            let top = 28 * (row - 1)
            let height = 28.8 
            return {
                top: top + 'px',
                height: height + 'px',
            }
        },
        generateRightRow(row) {
            let top = 28 * (row - 1)
            let height = 28.8 
            return {
                top: top + 'px',
                height: height + 'px',
            }
        },

        generateStyleSeat(index, topIndex) {
            //index, topIndex since zero
            
            let vm = this
            let left;
            let top;
            let background;
            let arr = vm.data[topIndex]
            if(arr) {
                if(arr.includes(index)) {
                    background = 'red';
                }
            }

            if(topIndex == 0) {
                top = 0
                left = 124 + 20 * index
            } else if (topIndex == 1) {
                top = 28
                left = 116 + 20 * index;
            } else {
                top = 56
                left = 108 + 20 * index;
            }
            return {
                top: top + 'px',
                left: left + 'px',
                'background-color': background
            }
        }
    },
}
</script>

<style lang = 'sass' scoped>
.buy_tickets_window
    width: 100%
    height: 100%
    background-color: rgba(0,0,0, 0.3)
    font-weight: 400
    display: block
    position: fixed
    left: 0
    top: 100px
    color: rgb(255,255,255)

.buy_tickets_frame
    width: 900px
    position: relative
    margin-left: auto 
    margin-right: auto 
    margin-top: 50px

.movie_hall
    width: 100%
    height: 100%
    background-color: rgb(0,0,0)
    position: relative

.movie_header
    background-color: rgb(45, 60, 85)
    display: flex

    .movie_header__session
        display: flex
        padding-left: 30px
        padding-top: 20px
        padding-bottom: 30px
        padding-ridght: 50px

    .movie_header__session-time
        display: block
        
    .movie_header__session-item
        display: block
        text-align: left
        padding-top: 10px

    .movie_header__close-button
        position: absolute
        top: 30px
        right: 30px

.movie_body
    width: 100%
    height: 100%
    display: block
    position: relative

.body_container
    margin-left: auto 
    margin-right: auto
    display: block
    position: relative

.body_hall
    width: 700px
    height: 300px
    padding-left: 100px
    padding-right: 100px
    padding-bottom: 20px
    margin-left: auto 
    margin-right: auto
    box-sizing: border-box

.body_hall_background
    box-sizing: border-box
    width: 100%
    height: 100%
    top: 100px
    position: relative

.body_hall__cols
    position: relative
    display: block
    width: 100%
    height: 100%
    left: 15%
    
.body_hall__rows
    dispaly: block
    position: relative

.body_hall__row
    width: 100%
    height: 20px
    display: block 
    position: absolute

.body_hall__row-left
    left: 0px
    display: flex
    position: absolute

.body_hall__row-right
    right: 20px
    display: flex
    position: absolute  

.body_hall__seats
    display: flex
    position: absolute
    justify-content: center
    align-content: center
    background-color: orange
    border-radius: 100px
    width: 10px
    height: 10px
    font-size: 8px
    color: orange
    &:hover
            font-size: 12px
            color: rgb(255,255,255)
            font-weight: bold
            width: 14px
            height: 14px

.body_hall__chosenSeat
    background-color: #3a87a8
    border-radius: 100px
    width: 14px
    height: 14px
    font-size: 12px
    color: rgb(255,255,255)
    display: flex
    position: absolute
    justify-content: center
    align-content: center

.movie_footer
    width: 100%
    display: flex 
    align-items: center
    justify-content: flex-end
    padding: 20px
    box-sizing: border-box
    background-color: rgb(45, 60, 85)

    .movie_footer__buyButton
        align-items: center
        display: flex
        border: 1px solid white
        font-size: 18px
        color: rgb(255,255,255)
        padding-left: 33px
        padding-right: 33px
        height: 50px
        font-weight: bold
        background-color: rgb(220,187,37)
        &:hover
            background-color: rgb(245, 234, 29)
            transition: background-color 1s




    
</style>
