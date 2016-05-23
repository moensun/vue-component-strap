<!--
Created by Bane.Shi.
Copyright MoenSun
User: Bane.Shi
Date: 16/4/24
Time: 12:50-->
<template>
    <div>
        <ms-datepicker-range-single></ms-datepicker-range-single>
    </div>
    <div>
        <div style="max-height: 100px;overflow-y: auto">
            <div v-for="(dateIndex,date) in selectedDates">{{date}}</div>
        </div>
    </div>
    <div>
        <ms-date-range-single-field :selected-dates.sync="selectedDates" 
                                    :is-focus=true 
                                    :is-disabled="isDisabled">
        </ms-date-range-single-field>
    </div>
</template>
<script>
    import {msDatepickerRangeSingle} from "../../src/index";
    import {msDateRangeSingleField} from "../../src/index";
    export default{
        data(){
            return {
                "selectedDates":[
                        "2016-4-1"
                ],
                "isDisabled":function (day) {
                    if(day.getDay()==4){
                        return true;
                    }
                }
            }
        },
        components:{
            msDatepickerRangeSingle,
            msDateRangeSingleField
        }
    }
</script>
<style>

</style>
