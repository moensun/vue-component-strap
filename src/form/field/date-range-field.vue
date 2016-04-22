<!--
Created by Bane.Shi.
Copyright MoenSun
User: Bane.Shi
Date: 16/4/22
Time: 14:26-->
<template>
    <div >
        <div class="input-group">
            <input v-el:date-field type="text" class="form-control" v-model="value" placeholder="{{placeholder}}">
            <div class="input-group-addon">
                <span class="glyphicon glyphicon-calendar ms-calendar" @click="showCalendar($event)"></span>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        components:{
        }
    }
</script>
<style>

</style>
