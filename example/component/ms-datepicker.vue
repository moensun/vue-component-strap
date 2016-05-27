<!--
Created by Bane.Shi.
Copyright MoenSun
User: Bane.Shi
Date: 16/4/22
Time: 14:34-->
<template>
    <div>
        <div>
            <div style="max-height: 100px;overflow-y: auto">
                <div v-for="(dateIndex,date) in selectedDates">{{date}}</div>
            </div>
        </div>
        <div>
            <ms-datepicker :selected-dates.sync="selectedDates"></ms-datepicker>
        </div>
    </div>
</template>
<script>
    import {msDatepicker} from "../../src/index";
    export default{
        data(){
            return {
                "selectedDates":[]
            }
        },
        components:{
            msDatepicker,
        }
    }
</script>
<style>

</style>
