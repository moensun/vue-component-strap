<!--
Created by Bane.Shi.
Copyright MoenSun
User: Bane.Shi
Date: 16/4/22
Time: 14:26-->
<template>
    <div >
        <div>
            <div>
                <div></div>
                <datepicker-range v-for="(monthIndex,month) in months"
                                  :current-date="month"
                                  :start-day.sync="startDay"
                                  :end-day.sync="endDay">
                </datepicker-range>
            </div>
        </div>
        <div class="input-group">
            <input v-el:date-field type="text" class="form-control" v-model="value" placeholder="{{placeholder}}">
            <div class="input-group-addon">
                <span class="glyphicon glyphicon-calendar ms-calendar" @click="showCalendar($event)"></span>
            </div>
        </div>
    </div>
</template>
<script>
    import datepickerRange from "../../picker/date/datepicker-range.vue";
    export default{
        data(){
            return {
                "startDay":{},
                "endDay":{},
                "months":[
                    (new Date(2016,4)),
                    (new Date(2016,5)),
                ]
            }
        },
        methods:{
            "showCalendar":function (e) {
                
            }
        },
        components:{
            datepickerRange
        }
    }
</script>
<style>

</style>
