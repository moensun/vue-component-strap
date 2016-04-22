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
                        <button class="btn btn-sm btn-default ms-center" >{{currentMouthText}}&nbsp;{{currentYear}}</button>
                    </th>
                </tr>
                <tr class="ms-weekday-line">
                    <th v-for="(weekDayIndex,weekDay) in weekDays">{{weekDay}}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(rowIndex,row) in dayArr">
                    <td v-for="(cellIndex,cell) in row" >
<!--                        <button type="button" class="btn btn-sm btn-default"
                                v-show="((new Date(cell)).getMonth() == currentDate.getMonth())"
                                :class="{'select-day':isSelected(cell)}"
                                @click="selectDay(cell)" >
                            <span>{{(new Date(cell)).getDate() | dayFormat}}</span>
                        </button>-->
                        <datepicker-range-day :day-item="cell"></datepicker-range-day>
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
            "startDay":{},
            "endDay":{}
        },
        data(){
            return {
                "currentYear":null,
                "currentMonth":null,
                "mouthStartDay":null,
                "dayArr":[]
            }
        },
        ready(){
            let me = this;
            me.initDays();
        },
        computed:{
            "currentMouthText":function () {
                let me = this;
                return me.months[me.currentMonth];
            }
        },
        methods:{
            "initDays":function () {
                let me = this;
                me.currentYear = me.currentDate.getFullYear();
                me.currentMonth = me.currentDate.getMonth();
                me.mouthStartDay = new Date(me.currentDate.getFullYear(),me.currentDate.getMonth(),1);
                me.refreshView();
            },
            "refreshView":function () {
                let me = this;
                let weekDay = me.mouthStartDay.getDay();
                me.mouthStartDay.setDate(me.mouthStartDay.getDate()-weekDay);
                let days = me.getDates(me.mouthStartDay,42);
                me.dayArr = me.split(days,7);
                console.log(me.dayArr);
            },
            "selectDay":function (dayItem) {
                let me = this;
                if((!me.startDay && !me.endDay) || (me.startDay && me.endDay)){
                    me.startDay = new Date(dayItem);
                    me.endDay = new Date(dayItem);
                }

                me.setSelectedDates();
            },
            "setSelectedDates":function () {
                let me = this;
                let dates = [];
                let startDay =  new Date(me.startDay);
                let endDay = new Date(me.endDay);
                debugger;
                while (true){
                    if( startDay.getFullYear()<= endDay.getFullYear()
                            && startDay.getMonth()<=endDay.getMonth()
                            && startDay.getDate()<=endDay.getDate()  ){
                        dates.push(_.cloneDeep(startDay));
                        startDay.setDate(startDay.getDate()+1);
                    }else {
                        break;
                    }
                }

                me.selectedDates = dates;
                console.log(me.selectedDates);
            },
            "isSelected":function (dayItem) {
                let me = this;
                let result = false;
                _.forEach(me.selectedDates,function (selectedDate) {
                    if(selectedDate.getFullYear()==dayItem.getFullYear()
                            && selectedDate.getMonth()==dayItem.getMonth()
                            && selectedDate.getDate()==dayItem.getDate()  ){
                        result = true;
                    }
                });
                return result;
            }
        },
        components:{
            datepickerRangeDay
        }
    }
</script>
<style lang="less" scoped>
    .ms-datepicker-range{
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
