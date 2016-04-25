<!--
Created by Bane.Shi.
Copyright MoenSun
User: Bane.Shi
Date: 16/4/22
Time: 14:41-->
<template>
    <div class="ms-datepicker-range">
        <table>
            <thead>
                <tr>
                    <th colspan="7">
                        <button class="btn btn-sm btn-default ms-center" @click="selectCurrentMonth()">
                            {{currentMouthText}}&nbsp;{{currentYear}}
                        </button>
                    </th>
                </tr>
                <tr class="ms-weekday-line">
                    <th v-for="(weekDayIndex,weekDay) in weekDays">{{weekDay}}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(rowIndex,row) in dayArr">
                    <td v-for="(cellIndex,cell) in row" >
                        <datepicker-range-day :day-item="cell"
                                              :start-day.sync="startDay"
                                              :end-day.sync="endDay"
                                              :current-month="currentMonth"
                                              :is-disabled="isDisabled"
                                              :selected-dates.sync="selectedDates">
                        </datepicker-range-day>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
    import _ from "lodash";
    import moment from "moment";
    import Vue from "vue";
    import datepickerMixin from "./datepickerMixin";

    import datepickerRangeDay from "./datepicker-range-day.vue";

    export default{
        name:'datepickerRange',
        mixins:[datepickerMixin],
        props:{
            "currentDate":{
                default:function () {
                    return new Date();
                }
            },
            "selectedDates":{
                default:function () {
                    return [];
                }
            },
            "startDay":{
                type:Date,
                twoWay:true,
                default:function () {
                   // return new Date();
                }
            },
            "endDay":{
                type:Date,
                twoWay:true,
                default:function () {
                   // return new Date();
                }
            }
        },
        data(){
            return {
                "currentYear":null,
                "currentMonth":null,
                "monthStartDay":null
            }
        },
        ready(){
            let me = this;
          //  me.initDays();
        },
        computed:{
            "currentMouthText":function () {
                let me = this;
                return me.months[me.currentMonth];
            },
            "dayArr":function () {
                let me = this;
                me.currentYear = me.currentDate.getFullYear();
                me.currentMonth = me.currentDate.getMonth();
                me.monthStartDay = new Date(me.currentDate.getFullYear(),me.currentDate.getMonth(),1);
                let weekDay = me.monthStartDay.getDay();
                me.monthStartDay.setDate(me.monthStartDay.getDate()-weekDay);
                let days = me.getDates(me.monthStartDay,42);
                return me.split(days,7);
            }
        },
        watch:{
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
        methods:{
            "selectCurrentMonth":function () {
                let me = this;
                let startDay = new Date(me.currentDate.getFullYear(),me.currentDate.getMonth(),1);
                let monthDayCount = me.getDaysInMonth(me.currentDate.getFullYear(),me.currentDate.getMonth());
                let endDay = new Date(me.currentDate.getFullYear(),me.currentDate.getMonth(),1);
                endDay.setDate(monthDayCount);

                me.startDay = startDay;
                me.endDay = endDay;
            },
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
/*                        if( startDay.getFullYear()<= endDay.getFullYear()
                                || startDay.getMonth()<=endDay.getMonth()
                                || startDay.getDate()<=endDay.getDate()  ){
                            dates.push(_.cloneDeep(startDay));
                            startDay.setDate(startDay.getDate()+1);
                        }else {
                            break;
                        }*/
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

            }

        },
        components:{
            datepickerRangeDay
        }
    }
</script>
<style lang="less" scoped>
    .ms-datepicker-range{
        display: inline-block;
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
        button{outline: none;}
        .ms-weekday-line{
            th{
                text-align: center;
            }
        }
        .ms-center{
            text-align: center;
            width: 100%;
        }
    }
</style>
