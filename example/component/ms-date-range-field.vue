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
        <ms-date-range-field></ms-date-range-field>
    </div>
</div>
</template>
<script>
    import {msDateRangeField} from "../../src/index";
    import {msDatepickerRange} from "../../src/index";
    export default{
        components:{
            msDateRangeField,
            msDatepickerRange
        }
    }
</script>
<style>

</style>
