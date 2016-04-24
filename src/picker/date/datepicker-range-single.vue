<!--
Created by Bane.Shi.
Copyright MoenSun
User: Bane.Shi
Date: 16/4/24
Time: 12:47-->
<template>
    <div class="ms-datepicker-range-single">
        <div>
            <datepicker-range-day-panel :current-month.sync="currentMonth" :current-year.sync="currentYear">
            </datepicker-range-day-panel>
        </div>
        <div>
            <datepicker-month-panel :current-month.sync="currentMonth" :current-year.sync="currentYear">
            </datepicker-month-panel>
        </div>
        <div>
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

    }
</style>
