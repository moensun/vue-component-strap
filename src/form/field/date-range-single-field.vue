<!--
Created by Bane.Shi.
Copyright MoenSun
User: Bane.Shi
Date: 16/4/24
Time: 17:08-->
<template>
    <div class="ms-date-range-single-field">
        <div>
            <datepicker-range-single :start-day.sync="startDayObj"
                                     :end-day.sync="endDayObj">
            </datepicker-range-single>
        </div>
        <div class="input-group">
            <input v-el:date-field type="text" class="form-control" v-model="dateRange" placeholder="{{placeholder}}">
            <div class="input-group-addon">
                <span class="glyphicon glyphicon-calendar ms-calendar" @click="showCalendar($event)"></span>
            </div>
        </div>
    </div>
</template>
<script>
    import MSUtil from "../../util/index";
    import moment from "moment";
    import datepickerRangeSingle from "../../picker/date/datepicker-range-single.vue";
    export default{
        props:{
            "startDay":{
                type:String,
                twoWay:true
            },
            "endDay":{
                type:String,
                twoWay:true
            },
            "selectedDates":{
                type:Array,
                twoWay:true,
                default:function () {
                    return [];
                }
            },
            "dateFormat":{
                type:String,
                default:function () {
                    return "YYYY-MM-DD";
                }
            },
        },
        data(){
            return {
                "calendarShow":false,
                "startDayObj":null,
                "endDayObj":null,
                "selectedDatesObj":[],
            }
        },
        computed:{
            "dateRange":function(){
                let me = this;
                if(me.startDay && me.endDay){
                    return me.startDay+"~"+me.endDay;
                }else {
                    return "";
                }
            }
        },
        watch:{
            "startDay":{
                handler:function (newValue,oldValue) {
                    let me = this;
                    if(newValue && newValue!=oldValue){
                        me.startDayObj = new Date(MSUtil.MSDate.dateAdapter(newValue));
                    }
                },
                //immediate:true
            },
            "endDay":{
                handler:function (newValue,oldValue) {
                    let me = this;
                    if(newValue && newValue!=oldValue){
                        me.endDayObj = new Date(MSUtil.MSDate.dateAdapter(newValue));
                    }
                },
                //immediate:true
            },
            "startDayObj":{
                handler:function (newValue,oldValue) {
                    let me = this;
                    if(newValue && JSON.stringify(newValue)!=JSON.stringify(oldValue)){
                        me.startDay = moment(newValue).format(me.dateFormat);
                    }
                },
                //immediate:true
            },
            "endDayObj":{
                handler:function (newValue,oldValue) {
                    let me = this;
                    if(newValue && JSON.stringify(newValue)!=JSON.stringify(oldValue)){
                        me.endDay = moment(newValue).format(me.dateFormat);
                    }
                },
                //immediate:true
            },
            "selectedDatesObj":{
                handler:function (newValue,oldValue) {
                    // debugger;
                    let me = this;
                    if(newValue && JSON.stringify(newValue)!=JSON.stringify(oldValue)){
                        let dates = [];
                        _.forEach(newValue,function (date) {
                            dates.push(moment(date).format(me.dateFormat));
                        });
                        me.selectedDates = dates;
                    }
                }
            },
            "selectedDates":{
                handler:function (newValue,oldValue) {
                    let me = this;
                    if(newValue && JSON.stringify(newValue)!=JSON.stringify(oldValue)){
                        let dates = [];
                        _.forEach(newValue,function (date) {
                            dates.push(new Date(me.dateAdapter(date)));
                        });
                        me.selectedDatesObj = dates;
                    }
                },
                immediate:true
            }
        },
        components:{
            datepickerRangeSingle
        }
    }
</script>
<style lang="less" scoped>

</style>
