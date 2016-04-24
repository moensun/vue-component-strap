<!--
Created by Bane.Shi.
Copyright MoenSun
User: Bane.Shi
Date: 16/4/24
Time: 15:44-->
<template>
    <button type="button" class="btn btn-sm btn-default"
            :class="{}"
            @click="selectYear()">
        <span>{{yearItem}}</span>
    </button>
</template>
<script>
    export default{
        name:'datepickerYear',
        props:{
            "yearItem":{}
        },
        components:{
        }
    }
</script>
<style>

</style>
