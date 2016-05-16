<!--
Created by Bane.Shi.
Copyright MoenSun
User: Bane.Shi
Date: 16/5/16
Time: 09:46-->
<template>
<div class="ms-time-panel">
    <div class="ms-time-cell">
        {{title}}
    </div>
    <div class="ms-time-cell">
        <datepicker-hour :hour.sync="hour" :hour-text="hourText">
        </datepicker-hour>
    </div>
    <div class="ms-time-cell">
        <datepicker-minute :minute.sync="minute" :minute-text="minuteText">
        </datepicker-minute>
    </div>
    <div class="ms-time-cell">
        <datepicker-second :second.sync="second" :second-text="secondText">
        </datepicker-second>
    </div>
</div>
</template>
<script>
    import datepickerHour from "./datepicker-hour.vue";
    import datepickerMinute from "./datepicker-minute.vue";
    import datepickerSecond from "./datepicker-second.vue";
    export default{
        props:{
            "title":{
                type:String
            },
            "date":{
                type:Date,
                twoWay:true,
                default:function () {
                    return  new Date();
                }
            },
            "hourText":{
                type:String
            },
            "minuteText":{
                type:Number
            },
            "secondText":{
                type:String
            }
        },
        data(){
            return {
                "hour":null,
                "minute":null,
                "second":null
            }
        },
        watch:{
            "date":{
                handler:function (newValue,oldValue) {
                    let me = this;
                    if(newValue){
                        me.hour = newValue.getHours();
                        me.minute = newValue.getMinutes();
                        me.second = newValue.getSeconds();
                    }else {
                        me.date = new Date();
                    }
                },
                immediate:true
            },
            "hour":{
                handler:function (newValue,oldValue) {
                    let me = this;
                    let date = _.cloneDeep(me.date);
                    date.setHours(newValue);
                    me.date = date;
                }
            },
            "minute":{
                handler:function (newValue,oldValue) {
                    let me = this;
                    let date = _.cloneDeep(me.date);
                    date.setMinutes(newValue);
                    me.date = date;
                }
            },
            "second":{
                handler:function (newValue,oldValue) {
                    let me = this;
                    let date = _.cloneDeep(me.date);
                    date.setSeconds(newValue);
                    me.date = date;
                }
            }
        },
        components:{
            datepickerHour,
            datepickerMinute,
            datepickerSecond
        }
    }
</script>
<style lang="less" scoped>
    .ms-time-panel{
        margin-left: auto;
        margin-right: auto;
        display: table;
        .ms-time-cell{
            display: table-cell;
        }
    }
</style>
