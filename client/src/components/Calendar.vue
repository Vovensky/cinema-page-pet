<template>
<div class='calendar'>
    <table>
        <thead>
        <tr>
            <th class='calendar__th' colspan ='4'>{{months[month]}} {{year}} </th>
            <th class='calendar__th' colspan='1'></th>
            <th class='calendar__arrow' @click = previousMonth()> &#x3C; </th> 
            <th class='calendar__arrow' @click = nextMonth()> > </th>
                                                     
        </tr>
        <tr>
            <th class='calendar__thead-th' v-for='day of daysOfWeek' :key ='day'>
                {{day}}
            </th>
        </tr>
        </thead>
        <tbody> 
        <tr v-for='(arr, indexArray) of buildCalendar[month+1]' :key = 'indexArray'> 
            <td class='calendar__td'
            :class = 'tdClass(day)'
            v-for='(day, index) of arr' :key = 'index' @click='chooseDay(day, $event)'> 
                {{day.date}}
            </td> 
        </tr>
        </tbody>
    </table>
</div>

</template>



<script>
export default {
    name: 'Calendar-C',
    data() {
        return {
            daysOfWeek: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
            months: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
            month: 0, // номер месяца
            actualMonth: null,
            maxDay: 0,
            year: 0,
            cols: 0,
            actualDay: null,
            daysInMonth: 0,
            weekLength: 7,
            date: null,
            currentDate: null,
            numberOfRows: 1,
            isActive: true,
        }
    }, 
    inject: ['provideToday'],
    created:
        function() { 
                                    //инициализация даты с началом текущего года, инициализация года, инициализация месяца (?)
            let date = new Date();
            this.year = date.getFullYear();
            this.actualMonth = date.getMonth();
            this.month = date.getMonth();
            this.actualDay = date.getDate();
            date.setMonth(0,1);
            this.date = date;
        },
    computed: {
        buildCalendar() { //вызывает renderCalendarAtTheYear, firstWeek, lastWeek и отдаёт нормальный календарь
             let year = this.renderCalendarAtTheYear(this.year);
             this.firstWeek(year);
             this.lastWeek(year);
             return year;
        },

    },

    methods: {
        tdClass(day) {
            let vm = this
            let min = vm.actualDay;
            let max = vm.actualDay + 7;
            let actualMonth = vm.actualMonth;
            // let month = this.month;
            let isActive = false;
            let isNewActive = false;
            let isOldActive = false;
            // console.log(day.date)
            // console.log(day.month)
            //  console.log(day.year)
            vm.maxDay = 31;
            if(actualMonth - day.month == 0 && day.date >= min && day.date < max) {
                isActive = true
            } else if(day.date < min && day.month - actualMonth == 1 && (vm.maxDay + day.date) <= max) {
                isNewActive = true
            }

            // if( actualMonth == day.month && day.date >= min && day.date <= max) {    //сделать так чтобы данные из MM.YYYY не переносились на аналогичный ММ в УУУУ+1
            //     isActive = true 
            // } else if( actualMonth - day.month == -1 && day.date < min && (this.maxDay + day.date) <= max ){
            //     isNewActive = true
            // } else if(actualMonth - month == -1 && day.date >= min && day.date <= max) {
            //     isOldActive = true
            // } else if(actualMonth - month == -1 && day.date < min && (this.maxDay + day.date) <= max ) {
            //     isActive = true
            // } else if(actualMonth == month && day.date < 21 && day.date >= min && day.date <= max && indexArray <= 2 ) {
            //     isActive = true
            // }


            
            return {
                calendar__activeTd: isActive,
                calendar__deactivatedTd: !isActive && !isNewActive && !isOldActive,
                calendar__activeNewTd: isNewActive,
                calendar__activeOldTd: isOldActive,
            }
            
        },

        chooseDay(day, event) {
            let arr = event.target.classList;
            let month;
            if(arr[1] == 'calendar__activeTd') {
                month = this.month
            } else if (arr[1] == 'calendar__activeNewTd') {
                month = this.month + 1
            } else if (arr[1]=='calendar__activeOldTd') {
                month = this.month - 1
            } else {return}

            this.$emit('chooseDay', {
                                    day: day.date,
                                    month: month} )
        },

        previousMonth() {
            this.month -=1;
            if(this.month < 0) {
                this.year -=1;
                this.month = 11;
                this.buildCalendar
            }
        },

        nextMonth() {
            this.month +=1;
            if(this.month > 11) {
                this.year +=1;
                this.month = 0;
                this.buildCalendar
            }
        },

        getDaysInMonth(date) {
            return new Date(date.setMonth(date.getMonth() +1, 0)).getDate()
        },

        firstWeek(calendar) { // 1 неделя каждого месяца
            for(let i = 1; i <= 13; i++) {
                let actualMonth = calendar[i];
                let previousMonth = calendar[i-1]
                let actualFirstWeek = actualMonth[0]
                if(actualFirstWeek.length < 7) {
                let lastWeekIndex = previousMonth.length - 1
                let lastWeekOfPreviousMonth = previousMonth[lastWeekIndex];
                calendar[i][0] = lastWeekOfPreviousMonth.concat(actualFirstWeek);
                }
            }
        },

        lastWeek(calendar) { //последняя неделя каждого месяца
            for(let i = 1; i <= 12; i++) {
                let actualMonth = calendar[i];
                let nextMonth = calendar[i+1];
                let lastWeekIndex = actualMonth.length - 1
                let firstWeekOfNextMonth = nextMonth[0];
                let actualLastWeek = actualMonth[lastWeekIndex];
                if(actualLastWeek.length < 7) {
                calendar[i][lastWeekIndex] = firstWeekOfNextMonth;
                }
                if(actualMonth.length < 6 && actualLastWeek.length == 7) {
                    calendar[i].push(nextMonth[0]);
                } else if(actualMonth.length < 6) {
                    calendar[i].push(nextMonth[1]);
                }
            }
        },

        renderCalendarAtTheYear(year) {
            let yearArr = [];
            for(let i = 0; i <= 13; i++) { //календарь с декабря 2021 - по январь 2023
                let date = 1;
                let currentMonth = new Date(year, i - 1, date);
                let actualMonth = currentMonth.getMonth();
                let actualYear = currentMonth.getFullYear();
                let firstDayOfMonthIndex = currentMonth.getDay() - 1;
                let daysInMonth = this.getDaysInMonth(currentMonth);
                let month = [];
                let week = [];
                if(firstDayOfMonthIndex == -1) {
                    firstDayOfMonthIndex = 6;
                }
                
                let cols = Math.ceil((daysInMonth + firstDayOfMonthIndex)/ 7);

               
                for(let i = 0; i <= 7 - firstDayOfMonthIndex - 1; i++) {
                    let obj = {}
                        obj.date = date;
                        obj.month = actualMonth;
                        obj.year = actualYear;
                    week.push(obj);
                    date++;
                }
                month.push(week);
                for(let j = 1; j <= cols; j++) {
                    week = [];
                    for(let i = 0; i <= 6; i++) {
                        let obj = {}
                        obj.date = date;
                        obj.month = actualMonth;
                        obj.year = actualYear;
                        week.push(obj);
                        date++
                        if(date > daysInMonth) {
                        break;
                    }
                }
                month.push(week);
                if(date > daysInMonth) {
                        break;
                    }
                }
            yearArr.push(month);
            
            }
            return yearArr
        },
    }
}
</script>

<style lang='sass' scoped>
.calendar
    border: solid 2px
    dispaly: block
    opacity: 1
    background-color: #0f1e37
    table
        margin: 10px
        border-collapse: separate

        .calendar__th
            text-align: left
            height: 40px
            color: rgb(255,255,255)

        .calendar__arrow 
            text-align: center
            color: rgb(255,255,255)
        
        .calendar__thead-th
            width: 32px
            height: 40px
            padding: 0px
            color: rgb(255,255,255)

        .calendar__td
            width: 32px
            height: 32px
            padding: 0px
            margin: 0px
            box-sizing: border-box
            
        .calendar__activeTd
            color: white
            &:hover
                    border: solid 3px
                    border-color: #FF69B4

        .calendar__activeNewTd
            color: white
            &:hover
                    border: solid 1px
                    border-color: #FF69B4

        .calendar__activeOldTd
            color: white
            &:hover
                    border: solid 1px
                    border-color: #FF69B4
        
        .calendar__deactivatedTd
            color: gray
        
        
</style>
