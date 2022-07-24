<template>
    <button class = 'timeTableElem' @click='emitDate'>
        <div>  {{date}} </div>
        <div> {{dayOfTheMonth}} </div>
    </button>
</template>

<script>

export default {
    name: 'timeTableElem',
    props: ['today', 'day'],
    data() {
        return {
            dayOfTheMonth: '',
            date: '',
            updatedDate: '',
        }
    },
    created: 
        function() {
                let date = this.today;
                let localDate = date;
                let day = this.day;
                let week = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 
                            'Четверг', 'Пятница', 'Суббота']

                let dayOfTheMonth = date.getDate() - 1 + day
                

                if(dayOfTheMonth == localDate.getDate()) {
                    this.date = "Сегодня"
                    this.dayOfTheMonth = dayOfTheMonth
                    this.updatedDate = date;
                } else {
                    let newDay = new Date(date.getFullYear(), 
                                          date.getMonth(),
                                          date.getDate() + day - 1);
                    
                    if(date.getDate() + day - localDate.getDate() == 2) {
                        this.date = "Завтра"
                        this.dayOfTheMonth = newDay.getDate()
                        this.updatedDate = newDay;
                    } else {
                        this.updatedDate = newDay;
                        this.dayOfTheMonth = newDay.getDate();                
                        this.date = week[newDay.getDay()]
                    }
                }    
        },
    methods: {
        emitDate() {
            let year = this.updatedDate.getFullYear();
            let month = this.updatedDate.getMonth();
            let todayDate = this.dayOfTheMonth;
            let actualDate = year + '-' + month + '-' + todayDate;
            console.log(actualDate)
            this.$emit('emitDate', { 
                                    dateString: actualDate,
                                    day: this.day
                                    })
        },
    }
}
</script>

<style lang = 'sass' scoped>
.timeTableElem
    display: block
    font-size: 16px
    color: black
    padding: 10px
    border: none
    border-top: solid 1px white
    width: 150px
    height: 40px
    font-weight: bold
    box-sizing: content-box
    transition: background 0.5s
    &:hover
        background: #A8A8A8
    &:focus
        background: #888888
</style>