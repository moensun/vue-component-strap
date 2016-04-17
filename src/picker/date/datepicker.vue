<!--
Created by Bane.Shi.
Copyright MoenSun
User: Bane.Shi
Date: 16/4/14
Time: 10:51-->
<template>
    <div class="ms-datepicker">
        <div class="ms-day" v-show="(viewType=='day')">
            <table>
                <thead>
                <tr class="ms-datepicker-operate">
                    <th>
                        <button class="btn btn-sm btn-default" @click="previousMouth()"><span class="glyphicon glyphicon-chevron-left"></span></button>
                    </th>
                    <th colspan="6">
                        <button class="btn btn-sm btn-default ms-center" @click="showMouthView()">{{currentMouthText}}&nbsp;{{currentYear}}</button>
                    </th>
                    <th>
                        <button class="btn btn-sm btn-default" @click="nextMouth()"><span class="glyphicon glyphicon-chevron-right"></span></button>
                    </th>
                </tr>
                <tr class="ms-weekday-line">
                    <th></th>
                    <th v-for="(weekDayIndex,weekDay) in weekDays">{{weekDay}}</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(rowIndex,row) in dayArr">
                    <td></td>
                    <td v-for="(cellIndex,cell) in row" >
                        <button type="button" class="btn btn-sm btn-default" :class="{'ms-today':isToday(cell),'other-mouth':isOtherMouth(cell),'select-day':isSelectDay(cell) }" @click="selectDay(cell)">
                            <span>{{(new Date(cell)).getDate() | dayFormat}}</span>
                        </button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <div class="ms-mouth" v-show="(viewType=='mouth')">
            <table>
                <thead>
                    <tr>
                        <th>
                            <button class="btn btn-sm btn-default" @click="previousYear()"><span class="glyphicon glyphicon-chevron-left"></span></button>
                        </th>
                        <th>
                            <button class="btn btn-sm btn-default" @click="showYearView()">{{currentYear}}</button>
                        </th>
                        <th>
                            <button class="btn btn-sm btn-default" @click="nextYear()"><span class="glyphicon glyphicon-chevron-right"></span></button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(mouthIndex,mouthRow) in mouthArr">
                        <td v-for="(mouthCellIndex,mouthCell) in mouthRow">
                            <button type="button" class="btn btn-sm btn-default" @click="selectMouth(mouthIndex,mouthCellIndex)" :class="{'current-mouth':isCurrentMouth(mouthIndex,mouthCellIndex)}">
                                <span>{{mouthCell}}</span>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="ms-year" v-show="(viewType=='year')">
            <table>
                <thead>
                    <tr>
                        <th>
                            <button class="btn btn-sm btn-default" @click="previousYearScope()"><span class="glyphicon glyphicon-chevron-left"></span></button>
                        </th>
                        <th colspan="3">
                            <button class="btn btn-sm btn-default" disabled>{{yearScope.start}}-{{yearScope.end}}</button>
                        </th>
                        <th>
                            <button class="btn btn-sm btn-default" @click="nextYearScope()"><span class="glyphicon glyphicon-chevron-right"></span></button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(yearRowIndex,yearRow) in yearArr">
                        <td v-for="(yearCellIndex,yearCell) in yearRow ">
                            <button type="button" class="btn btn-sm btn-default" :class="{'current-year':(yearCell==currentYear)}" @click="selectYear(yearCell)">
                                <span>{{yearCell}}</span>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div>

        </div>
    </div>

</template>
<script>
    import _ from "lodash";
    import moment from "moment";
    import Vue from "vue";
    export default{
        props:{
            "weekDays":{
                type:Array,
                default:function () {
                    return ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
                }
            },
            "mouths":{
                type:Array,
                default:function () {
                    return ["January","February","March","April","May","June","July","August","September","October","November","December"];
                }
            },
            "selectedDates":{
                twoWay:true
            },
            "value":{
                twoWay:true
            },
            "multiple":{
                type:String,
                default:function () {
                    return "true";
                }
            },
            "dateFormat":{
                type:String,
                default:function () {
                    return "YYYY-MM-DD";
                }
            },
            "dayItemClick":{
                type:Function
            }
        },
        data(){
            return{
                "dayArr":[],
                "mouthArr":[],
                "yearArr":[],
                "currentDay":null,
                "mouthStartDay":null,
                "currentMouth":null,
                "currentYear":null,
                "yearScope":{
                    "start":null,
                    "end":null
                },
                "viewType":"day",
                "DAYS_IN_MONTH":[31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
            }
        },
        computed:{
            "currentMouthText":function(){
                let me = this;
                if(me.currentMouth != null){
                    return me.mouths[me.currentMouth];
                }
            }
        },
        ready(){
            let me = this;
            me.initData();
            me.initDays();
            me.getMouths();
            me.initYearScope();
        },
        filters:{
            "dayFormat":function (date) {
                if(date<10){
                    return "0"+date;
                }else {
                    return date;
                }
            }
        },
        watch:{
            "selectedDates":{
                handler:function (newValue,oldValue) {
                    let me = this;
                   // if(JSON.stringify(newValue) != JSON.stringify(oldValue) ){
                        if(me.multiple === "true"){
                            let dates = [];
                            if(me.selectedDates && _.isArray(me.selectedDates) ){
                                _.forEach(me.selectedDates,function (vItem) {
                                    dates.push(moment(vItem).format(me.dateFormat));
                                });
                            }
                            debugger;
                            me.value = dates;
                        }else {
                            if(newValue){
                                me.value = moment(newValue).format(me.dateFormat);
                            }else {
                                me.value = "";
                            }

                        }
                   // }

                }
            },
            "value":{
                handler:function (newValue,oldValue) {
                    let me = this;
                    if( JSON.stringify(newValue) != JSON.stringify(oldValue) ){
                        if(me.multiple === "true"){
                            let dates = [];
                            if(me.selectedDates){
                                for(var i =0 ;i<me.selectedDates.length;i++){
                                    dates.push(new Date(me.dateAdapter(me.selectedDates[i])));
                                }
                            }
                            me.selectedDates = dates;
                        }else {
                            if(newValue){
                                me.selectedDates = new Date(me.dateAdapter(newValue));
                            }else {
                                me.selectedDates = "";
                            }
                        }
                    }
                },
                immediate: true
            }
        },
        methods:{
            "dateAdapter":function (date) {
                if(typeof date === 'object'){
                    return date;
                }else {
                    return date.replace(/-/g,'/');
                }

            },
            "initData":function () {
                let me = this;

            },
            "initDays":function () {
                let me = this;
                me.currentDay = new Date();
                me.currentMouth = me.currentDay.getMonth();
                me.currentYear = me.currentDay.getFullYear();
                me.mouthStartDay = new Date(me.currentDay.getFullYear(),me.currentDay.getMonth(),1);
                me.refreshView();
            },
            "refreshView":function () {
                let me = this;
                me.mouthStartDay = new Date(me.currentYear,me.currentMouth,1);
                let weekDay = me.mouthStartDay.getDay();
                me.mouthStartDay.setDate(me.mouthStartDay.getDate()-weekDay);
                let days = me.getDates(me.mouthStartDay,42);
                me.dayArr = me.split(days,7);
            },
            "previousMouth":function () {
                let me = this;
                if(me.currentMouth>0){
                    me.currentMouth = me.currentMouth-1;
                }else {
                    me.currentMouth = 11;
                    me.currentYear = me.currentYear-1;
                }
                me.refreshView();
            },
            "nextMouth":function () {
                let me = this;
                if(me.currentMouth<11){
                    me.currentMouth = me.currentMouth+1;
                }else {
                    me.currentMouth = 0;
                    me.currentYear = me.currentYear+1;
                }
                me.refreshView();
            },
            "getDates":function (startDate,n) {
                
                var dates = new Array(n), current = new Date(startDate), i = 0, date;
                while (i < n) {
                    date = new Date(current);
                    dates[i++] = date;
                    current.setDate(current.getDate() + 1);
                }
                return dates;
            },
            "getMouths":function () {
                let me = this;
                me.mouthArr = me.split(_.clone(me.mouths),3);

            },
            "split":function (arr, size) {
                let arrays = [];
                while (arr.length > 0) {
                    arrays.push(arr.splice(0, size));
                }
                return arrays;
            },
            "isToday":function (dayItem) {
                let day = new Date(dayItem);
                let today = new Date();
                return (day.getFullYear()===today.getFullYear() && day.getMonth()===today.getMonth() && day.getDate()===today.getDate());
            },
            "isOtherMouth":function (dayItem) {
                let day = new Date(dayItem);
                return day.getMonth() != this.currentMouth;
            },
            "isSelectDay":function (dayItem) {
                let me = this;
                let day = new Date(dayItem);
                if(me.multiple === "true"){
                    let isSelect = false;
                    if(me.selectedDates && me.selectedDates.length){
                        _.forEach(me.selectedDates,function (selectDay) {
                            if(typeof selectDay === 'object'){
                                if(day.getFullYear()===selectDay.getFullYear() &&
                                        day.getMonth()===selectDay.getMonth() &&
                                        day.getDate()===selectDay.getDate() ){
                                    isSelect = true;
                                }
                            }

                        });
                    }
                    return isSelect;
                }else {
                    let selectDay = new Date(me.selectedDates);
                    return (day.getFullYear()===selectDay.getFullYear() &&
                    day.getMonth()===selectDay.getMonth() &&
                    day.getDate()===selectDay.getDate() );
                }
            },
            "selectDay":function (dayItem) {
                let me = this;
                let day = new Date(dayItem);
                if(day.getMonth() != me.currentMouth){
                    me.currentMouth = day.getMonth();
                    me.currentYear = day.getFullYear();
                    me.refreshView();
                }
                if(me.multiple==="true"){
                    me.multipleSelect(day);
                }else {
                    me.singleSelect(day);
                }
                if(typeof me.dayItemClick === 'function'){
                    me.dayItemClick();
                }
            },
            "singleSelect":function (dayItem) {
                let me = this;
                me.selectedDates = dayItem;
            },
            "multipleSelect":function (dayItem) {
                let me = this;
                let index = -1 ;
                if(me.selectedDates && me.selectedDates.length ){
                    for(var i=0;i<me.selectedDates.length;i++){
                        if(dayItem.getFullYear()===me.selectedDates[i].getFullYear() &&
                                dayItem.getMonth()===me.selectedDates[i].getMonth() &&
                                dayItem.getDate() === me.selectedDates[i].getDate()
                        ){
                            index = i;
                        }
                    }
                }else {
                    me.selectedDates = [];
                }

                if(index >= 0){
                    me.selectedDates.splice(index,1);
                }else {
                    me.selectedDates.push(dayItem);
                }
            },
            "selectMouth":function (rowIndex,cellIndex) {
                let me = this;
                me.currentMouth = rowIndex*3+cellIndex;
                me.refreshView();
                me.viewType = 'day';
            },
            "isCurrentMouth":function (rowIndex,cellIndex) {
                let me = this;
                return me.currentMouth == rowIndex*3+cellIndex;
            },
            "previousYear":function () {
                let me = this;
                me.currentYear = me.currentYear-1;
                me.refreshView();
                if(me.currentYear<me.yearScope.start){
                    me.previousYearScope();
                }
            },
            "nextYear":function () {
                let me = this;
                me.currentYear = me.currentYear+1;
                me.refreshView();
                if(me.currentYear>me.yearScope.end){
                    me.nextYearScope();
                }
            },
            "initYearScope":function () {
                let me = this;
                let remainder = me.currentYear%20;
                me.yearScope.start = me.currentYear-remainder+1;
                me.yearScope.end = me.currentYear+(20-remainder);
                me.getYears();
            },
            "getYears":function () {
                let me = this;
                let years = [];
                for(var i = me.yearScope.start ; i<=me.yearScope.end;i++ ){
                    years.push(i);
                }
                me.yearArr = me.split(years,5);
            },
            "previousYearScope":function () {
                let me = this;
                me.yearScope.start = me.yearScope.start -20;
                me.yearScope.end = me.yearScope.end-20;
                me.getYears();
            },
            "nextYearScope":function () {
                let me = this;
                me.yearScope.start = me.yearScope.start+20;
                me.yearScope.end = me.yearScope.end+20;
                me.getYears();
            },
            "selectYear":function (year) {
                let me = this;
                me.currentYear = year;
                me.refreshView();
                me.viewType = 'mouth';
            },
            "showMouthView":function () {
                let me = this;
                me.viewType = 'mouth';
            },
            "showYearView":function () {
                let me = this;
                me.viewType = 'year';
            }
        },
        components:{

        }
    }
</script>
<style lang="less" scoped>
    .ms-datepicker{
        display: inline-block;
        .ms-day{
            table{
                button{
                    outline: none;
                }
                thead{
                    tr{
                        &.ms-datepicker-operate{
                            th{
                                button{
                                    &.ms-center{
                                         width: 100%;
                                         text-align: center;
                                         font-size: 14px;
                                     }
                                }
                            }
                        }
                        &.ms-weekday-line{
                            th{
                                text-align: center;
                            }
                        }
                    }
                }
                tbody{
                    tr{
                        td{
                            button{
                                &.ms-today{color: #00b3ee;}
                                &.other-mouth{color: #777;}
                                &.select-day{
                                     color: #fff;
                                     background-color: #31b0d5;
                                     border-color: #269abc;
                                 }
                            }
                        }
                    }
                }
            }
        }

        .ms-mouth{
            button{width: 100%;}
            table{
                tbody{
                    tr{
                        td{
                            button{
                                &.current-mouth{
                                     color: #fff;
                                     background-color: #31b0d5;
                                     border-color: #269abc;
                                 }
                            }
                        }
                    }
                }
            }
        }

        .ms-year{
            button{width: 100%;}
            table{
                tbody{
                    tr{
                        td{
                            button{
                            &.current-year{
                                 color: #fff;
                                 background-color: #31b0d5;
                                 border-color: #269abc;
                             }
                            }
                        }
                    }
                }
            }
        }

    }

</style>
