<!--
Created by Bane.Shi.
Copyright MoenSun
User: Bane.Shi
Date: 16/4/25
Time: 12:04-->
<template>
    <div class="ms-datepicker-day-panel">
        <table>
            <thead>
                <tr>
                    <th>
                        <button class="btn btn-sm btn-default" @click="previousMouth()">
                            <span class="glyphicon glyphicon-chevron-left"></span>
                        </button>
                    </th>
                    <th colspan="6">
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
                    <th></th>
                    <th v-for="(weekDayIndex,weekDay) in weekDays">{{weekDay}}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(dayRowIndex,dayRow) in dayArr">
                    <td></td>
                    <td v-for="(dayCellIndex,dayCell) in dayRow">
                        <datepicker-day :day-item="dayCell"
                                        :current-date.sync="currentDate"
                                        :selected-dates.sync="selectedDates"
                                        :current-month.sync="currentMonth"
                                        :multiple="multiple"
                                        :day-item-click="dayItemClick">
                        </datepicker-day>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
    import datepickerMixin from "./datepickerMixin";
    import datepickerDay from "./datepicker-day.vue";
    export default{
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
            "multiple":{
                type:String,
                default:function () {
                    return "false";
                }
            },
            "dayItemClick":{
                type:Function
            }
        },
        data(){
            return {
                "panelStartDay":null
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
            datepickerDay
        }
    }
</script>
<style lang="less" scoped>
    .ms-datepicker-day-panel{
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
