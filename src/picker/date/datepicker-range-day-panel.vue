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
                        <button class="btn btn-sm btn-default">
                            {{currentMonthText}}&nbsp;{{currentYear}}
                        </button>
                    </th>
                    <th>
                        <button class="btn btn-sm btn-default" @click="nextMouth()">
                            <span class="glyphicon glyphicon-chevron-right"></span>
                        </button>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(dayRowIndex,dayRow) in dayArr">
                    <td v-for="(dayCellIndex,dayCell) in dayRow">
                        <datepicker-range-day :day-item="dayCell"
                                              :current-month="currentMonth">
                        </datepicker-range-day>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
    import datepickerRangeDay from "./datepicker-range-day.vue";
    import datepickerMixin from "./datepickerMixin";
    export default{
        name:'datepickerRangeDayPanel',
        mixins:[datepickerMixin],
        props:{
            "currentDate":{
                default:function () {
                    return new Date();
                }
            },
            "currentMonth":{
                twoWay:true
            },
            "currentYear":{
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
        components:{
            datepickerRangeDay
        }
    }
</script>
<style lang="less" scoped>
.ms-datepicker-range-day-panel{
    button{width: 100%;}
}
</style>
