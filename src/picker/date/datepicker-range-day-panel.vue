<!--
Created by Bane.Shi.
Copyright MoenSun
User: Bane.Shi
Date: 16/4/24
Time: 13:52-->
<template>
    <div class="ms-datepicker-range-day-panel">
        <table>
            <thead>
                <tr>
                    <th>
                        <button class="btn btn-sm btn-default" @click="previousMouth()">
                            <span class="glyphicon glyphicon-chevron-left"></span>
                        </button>
                    </th>
                    <th colspan="5">
                        <button class="btn btn-sm btn-default" @click="showMonthView()">
                            {{currentMonthText}}&nbsp;{{currentYear}}
                        </button>
                    </th>
                    <th>
                        <button class="btn btn-sm btn-default" @click="nextMouth()">
                            <span class="glyphicon glyphicon-chevron-right"></span>
                        </button>
                    </th>
                </tr>
                <tr class="ms-weekday-line">
                    <th v-for="(weekDayIndex,weekDay) in weekDays">{{weekDay}}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(dayRowIndex,dayRow) in dayArr">
                    <td v-for="(dayCellIndex,dayCell) in dayRow">
                        <datepicker-range-day :day-item="dayCell"
                                              :current-month.sync="currentMonth"
                                              :start-day.sync="startDay"
                                              :end-day.sync="endDay"
                                              :selected-dates.sync="selectedDates"
                                              :is-disabled="isDisabled">
                        </datepicker-range-day>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
    import _ from "lodash";
    import datepickerRangeDay from "./datepicker-range-day.vue";
    import datepickerMixin from "./datepickerMixin";
    export default{
        name:'datepickerRangeDayPanel',
        mixins:[datepickerMixin],
        props:{
            "currentDate":{
                twoWay:true,
                default:function () {
                    return new Date();
                }
            },
            "currentMonth":{
                twoWay:true
            },
            "currentYear":{
                twoWay:true
            },
            "selectedDates":{
                twoWay:true
            },
            "startDay":{
                twoWay:true
            },
            "endDay":{
                twoWay:true
            },
            "viewType":{
                twoWay:true
            }
        },
        data(){
            return {
                "panelStartDay":null
            }
        },
        watch:{
            "currentMonth":{
                handler:function (newValue,oldValue) {
                    let me = this;
                    if(newValue && me.currentYear){
                        me.currentDate = new Date(me.currentYear,newValue);
                    }
                }
            },
            "currentYear":{
                handler:function (newValue,oldValue) {
                    let me = this;
                    if(newValue && me.currentMonth){
                        me.currentDate = new Date(newValue,me.currentMonth);
                    }
                }
            },
            "startDay":{
                handler:function (newValue,oldValue) {
                    let me = this;
                    me.setSelectedDates();
                },
                //immediate:true
            },
            "endDay":{
                handler:function (newValue,oldValue) {
                    let me = this;
                    me.setSelectedDates();
                },
                //immediate:true
            }
        },
        computed:{
            "dayArr":function () {
                let me = this;
                me.currentYear = me.currentDate.getFullYear();
                me.currentMonth = me.currentDate.getMonth();
                me.panelStartDay = new Date(me.currentDate.getFullYear(),me.currentDate.getMonth(),1);
                let weekDay = me.panelStartDay.getDay();
                me.panelStartDay.setDate(me.panelStartDay.getDate()-weekDay);
                let days = me.getDates(me.panelStartDay,42);
                return me.split(days,7);
            },
            "currentMonthText":function () {
                let me = this;
                return me.months[me.currentMonth];
            }
        },
        methods:{
            "setSelectedDates":function () {
                let me = this;
                if(typeof me.startDay != 'object'){
                    me.startDay = new Date(me.startDay);
                }
                if(typeof me.endDay != 'object'){
                    me.endDay = new Date(me.endDay);
                }
                if(me.startDay && me.endDay){
                    let dates = [];
                    let startDay =  new Date(me.startDay.getFullYear(),me.startDay.getMonth(),me.startDay.getDate());
                    let endDay = new Date(me.endDay.getFullYear(),me.endDay.getMonth(),me.endDay.getDate());
                    while (true){
                        if(startDay <= endDay ){
                            if(typeof me.isDisabled == 'function'){
                                if(!me.isDisabled(startDay)){
                                    dates.push(_.cloneDeep(startDay));
                                }
                            }else {
                                dates.push(_.cloneDeep(startDay));
                            }
                            startDay.setDate(startDay.getDate()+1);
                        }else {
                            break;
                        }
                    }
                    me.selectedDates = dates;
                }

            },
            "previousMouth":function () {
                let me = this;
                let date = _.cloneDeep(me.currentDate);
                date.setMonth(date.getMonth()-1);
                me.currentDate = date;
            },
            "nextMouth":function () {
                let me = this;
                let date = _.cloneDeep(me.currentDate);
                date.setMonth(date.getMonth()+1);
                me.currentDate = date;
            },
            "showMonthView":function () {
                let me = this;
                me.viewType = "month";
            }
        },
        components:{
            datepickerRangeDay
        }
    }
</script>
<style lang="less" scoped>
.ms-datepicker-range-day-panel{
    display: inline-block;
    button{
        width: 100%;
    }
    .ms-weekday-line{
        th{
            text-align: center;
        }
    }
}
</style>
