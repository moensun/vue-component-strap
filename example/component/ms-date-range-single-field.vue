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
        <ms-date-range-single-field></ms-date-range-single-field>
    </div>
</template>
<script>
    import {msDatepickerRangeSingle} from "../../src/index";
    import {msDateRangeSingleField} from "../../src/index";
    export default{
        components:{
            msDatepickerRangeSingle,
            msDateRangeSingleField
        }
    }
</script>
<style>

</style>
