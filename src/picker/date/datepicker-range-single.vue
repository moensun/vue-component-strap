<!--
Created by Bane.Shi.
Copyright MoenSun
User: Bane.Shi
Date: 16/4/24
Time: 12:47-->
<template>
    <div class="ms-datepicker-range-single">
        <div class="ms-day-panel">
            <datepicker-range-day-panel :current-month.sync="currentMonth"
                                        :current-year.sync="currentYear"
                                        :start-day="startDay"
                                        :end-day.sync="endDay">
            </datepicker-range-day-panel>
        </div>
        <div class="ms-month-panel">
            <datepicker-month-panel :current-month.sync="currentMonth"
                                    :current-year.sync="currentYear">
            </datepicker-month-panel>
        </div>
        <div class="ms-year-panel">
            <datepicker-year-panel :current-year.sync="currentYear">

            </datepicker-year-panel>
        </div>
    </div>
</template>
<script>
    import datepickerRangeDayPanel from "./datepicker-range-day-panel.vue";
    import datepickerMonthPanel from "./datepicker-month-panel.vue";
    import datepickerYearPanel from "./datepicker-year-panel.vue";
    export default{
        props:{
            "selectedDates":{
                default:function () {
                    return [];
                }
            },
            "startDay":{
                type:Date,
                twoWay:true,
                default:function () {
                }
            },
            "endDay":{
                type:Date,
                twoWay:true,
                default:function () {
                }
            }
        },
        data(){
            return {
                "currentMonth":{},
                "currentYear":{}
            }
        },
        components:{
            datepickerRangeDayPanel,
            datepickerMonthPanel,
            datepickerYearPanel
        }
    }
</script>
<style lang="less" scoped>
    .ms-datepicker-range-single{
        .ms-day-panel{display: inline-block;}
        .ms-month-panel{display: inline-block;}
        .ms-year-panel{display: inline-block;}
    }
</style>
