<!--
Created by Bane.Shi.
Copyright MoenSun
User: Bane.Shi
Date: 16/4/25
Time: 13:19-->
<template>
<div class="ms-datepicker">
    <div class="ms-day-panel" v-show="(viewType =='day')">
        <datepicker-day-panel :multiple="multiple"
                              :day-item-click="dayItemClick"
                              :current-month.sync="currentMonth"
                              :current-year.sync="currentYear"
                              :selected-dates.sync="selectedDates"
                              :view-type.sync="viewType"
                              :is-disabled="isDisabled">
        </datepicker-day-panel>
    </div>
    <div class="ms-month-panel" v-show="(viewType == 'month')">
        <datepicker-month-panel :current-month.sync="currentMonth"
                                :current-year.sync="currentYear"
                                :view-type.sync="viewType">
        </datepicker-month-panel>
    </div>
    <div class="ms-year-panel" v-show="(viewType == 'year')">
        <datepicker-year-panel :current-year.sync="currentYear"
                               :view-type.sync="viewType">
        </datepicker-year-panel>
    </div>
</div>
</template>
<script>
    import datepickerDayPanel from "./datepicker-day-panel.vue";
    import datepickerMonthPanel from "./datepicker-month-panel.vue";
    import datepickerYearPanel from "./datepicker-year-panel.vue";
    export default{
        name:'datepicker',
        props:{
            "selectedDates":{
                type:Array,
                twoWay:true,
                default:function () {
                    return [];
                }
            },
            "multiple":{
                type:Boolean,
                default:function () {
                    return false;
                }
            },
            "dayItemClick":{
                type:Function
            }
        },
        data(){
            return {
                "currentMonth":(new Date()).getMonth(),
                "currentYear":(new Date()).getFullYear(),
                "viewType":"day"
            }
        },
        components:{
            datepickerDayPanel,
            datepickerMonthPanel,
            datepickerYearPanel
        }
    }
</script>
<style lang="less" scoped>
    .ms-datepicker{
        .ms-day-panel{display: inline-block;}
        .ms-month-panel{display: inline-block;}
        .ms-year-panel{display: inline-block;}
    }
</style>
