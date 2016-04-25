<!--
Created by Bane.Shi.
Copyright MoenSun
User: Bane.Shi
Date: 16/4/24
Time: 12:47-->
<template>
    <div class="ms-datepicker-range-single">
        <div class="ms-day-panel" v-show="(viewType=='day')">
            <datepicker-range-day-panel :current-month.sync="currentMonth"
                                        :current-year.sync="currentYear"
                                        :start-day.sync="startDay"
                                        :end-day.sync="endDay"
                                        :selected-dates.sync="selectedDates"
                                        :view-type.sync="viewType"
                                        :is-disabled="isDisabled">
            </datepicker-range-day-panel>
        </div>
        <div class="ms-month-panel" v-show="(viewType=='month')">
            <datepicker-month-panel :current-month.sync="currentMonth"
                                    :current-year.sync="currentYear"
                                    :view-type.sync="viewType">
            </datepicker-month-panel>
        </div>
        <div class="ms-year-panel" v-show="(viewType=='year')">
            <datepicker-year-panel :current-year.sync="currentYear"
                                   :view-type.sync="viewType">
            </datepicker-year-panel>
        </div>
    </div>
</template>
<script>
    import datepickerRangeDayPanel from "./datepicker-range-day-panel.vue";
    import datepickerMonthPanel from "./datepicker-month-panel.vue";
    import datepickerYearPanel from "./datepicker-year-panel.vue";
    import datepickerMixin from "./datepickerMixin";
    export default{
        name:'datepickerRangeSingle',
        mixins:[datepickerMixin],
        props:{
            "selectedDates":{
                type:Array,
                twoWay:true,
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
                "currentYear":{},
                "viewType":"day"
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
