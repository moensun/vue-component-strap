<!--
Created by Bane.Shi.
Copyright MoenSun
User: Bane.Shi
Date: 16/4/22
Time: 14:32-->
<template>
<div>
    <div>
        <ms-datepicker-range></ms-datepicker-range>
    </div>
    <div>
        <ms-date-range-field :selected-dates.sync="selectedDates"></ms-date-range-field>
    </div>
    <div>
        <div style="max-height: 100px;overflow-y: auto">
            <div v-for="(dateIndex,date) in selectedDates">{{date}}</div>
        </div>
    </div>
</div>
</template>
<script>
    import {msDateRangeField} from "../../src/index";
    import {msDatepickerRange} from "../../src/index";
    export default{
        data(){
            return {
                "selectedDates":[
                        "2016/4/25","2016/4/26"
                ]
            }
        },
        components:{
            msDateRangeField,
            msDatepickerRange
        }
    }
</script>
<style>

</style>
