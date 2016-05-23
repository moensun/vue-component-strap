<!--
Created by Bane.Shi.
Copyright MoenSun
User: Bane.Shi
Date: 16/4/16
Time: 15:54-->
<template>
    <div class="ms-date-field">
        <div class="ms-picker" v-show="calendarShow">
            <div v-el:date-picker class="ms-picker-box ms-picker-box-down" >
                <datepicker :multiple="multiple"
                            :is-disabled="isDisabled"
                            :day-item-click="dayItemClick"
                            :selected-dates.sync="selectedDates">
                </datepicker>
                <div>
                    <span>
                        <button type="button" class="btn btn-info btn-sm" @click="onToday()">{{todayText}}</button>
                        <button type="button" class="btn btn-danger btn-sm" @click="onClean()">{{cleanText}}</button>
                    </span>
                    <span class="ms-span-right">
                        <button type="button" class="btn btn-danger btn-sm" @click="onClose()">{{closeText}}</button>
                    </span>
                </div>
            </div>
        </div>
        <div class="input-group">
            <input v-el:date-field type="text" class="form-control" v-model="showDate" placeholder="{{placeholder}}" @click="showCalendarInput($event)">
            <div class="input-group-addon ms-calendar" @click="showCalendar($event)">
                <span class="glyphicon glyphicon-calendar" ></span>
            </div>
        </div>

    </div>
</template>
<script>
    import Vue from "vue";
    import _ from "lodash";
    import moment from "moment";
    import MSUtil from "../../util/index";
    import dateFieldMixin from "./mixin/dateFieldMixin";
    import datepicker from "../../picker/date/datepicker.vue";
    export default{
        name:'dateField',
        mixins:[dateFieldMixin],
        replace:false,
        props:{
            "placeholder":{
                type:String,
                default:function () {
                    return "";
                }
            },
            "readonly":{
                type:String,
                default:function () {
                    return "false";
                }
            },
            "multiple":{
                type:Boolean,
                default:function () {
                    return false;
                }
            },
            "value":{
                twoWay:true
            },
            "dateFormat":{
                type:String,
                default:function () {
                    return "YYYY-MM-DD";
                }
            },
            "isDisabled":{
                type:Function
            },
            "isFocus":{
                type:Boolean,
                default:function(){
                    return false;
                }
            }
        },
        data(){
            let me = this;
            return{
                "calendarShow":false,
                "selectedDates":[]
            }
        },
        ready(){
            let me = this;
            me.eventNamespace = _.uniqueId(".date_field_click_");
            $(document).on('click'+me.eventNamespace,function (e) {
                let el = me.$el;
                if(!el.contains(e.target)){
                    me.calendarShow = false;
                }
            });
        },
        watch:{
            "value":{
                handler:function (newValue,oldValue) {
                    let me = this;
                    if(newValue && JSON.stringify(newValue)!=JSON.stringify(oldValue)){
                        if(me.multiple && _.isArray(newValue)){
                            me.selectedDates = MSUtil.MSDate.stringArrayToDateArray(newValue);
                        }else {
                            let dates  = [];
                            dates.push(new Date(MSUtil.MSDate.dateAdapter(newValue)));
                            me.selectedDates = dates;
                        }
                    }
                },
                immediate:true
            },
            "selectedDates":{
                handler:function (newValue,oldValue) {
                    let me = this;
                    if(newValue && JSON.stringify(newValue) != JSON.stringify(oldValue)){
                        if(me.multiple){
                            me.value = MSUtil.MSDate.dateArrayToStringArray(newValue,me.dateFormat);
                        }else{
                            if(newValue[0]){
                                me.value = moment(newValue[0]).format(me.dateFormat);
                            }else {
                                me.value = "";
                            }
                        }
                    }
                }
            }
        },
        computed:{
            "showDate":function () {
                let me = this;
                return me.value;
            }
        },
        methods:{
            "initComponent":function () {
                let me = this;
                if(me.readonly === "true"){
                    me.$els.dateField.setAttribute("readonly","readonly");
                }else {
                    me.$els.dateField.removeAttribute("readonly");
                }
            },
            "showCalendar":function (e) {
                let me = this;
                me.calendarShow = !me.calendarShow;
                me.$els.dateField.focus();
                if(e.clientY < (document.documentElement.clientHeight/2)){
                    Vue.util.addClass(me.$els.datePicker,"ms-picker-box-down");
                    Vue.util.removeClass(me.$els.datePicker,"ms-picker-box-up");
                }else {
                    Vue.util.addClass(me.$els.datePicker,"ms-picker-box-up");
                    Vue.util.removeClass(me.$els.datePicker,"ms-picker-box-down");
                }
            },
            "showCalendarInput":function(e){
                if(this.isFocus){
                    this.showCalendar(e);
                }                
            },
            "dayItemClick":function () {
                let me = this;
                if(!(me.multiple)){
                    me.calendarShow = false;
                }

            },
            "onClose":function () {
                let me = this;
                me.calendarShow = false;
            },
            "onClean":function () {
                let me = this;
                if(me.multiple){
                    me.value = [];
                }else {
                    me.value = "";
                }
            },
            "onToday":function () {
                let me = this;
                if(me.multiple){
                    me.value = [];
                    me.value.push(moment(new Date()).format(me.dateFormat));
                }else {
                    me.value = moment(new Date()).format(me.dateFormat);
                }

            }
        },
        components:{
            datepicker
        }
    }
</script>
<style lang="less" scoped>
    .ms-date-field{
        .ms-calendar{
            cursor: pointer;
        }
        .ms-picker{
            position:relative;
            .ms-picker-box{
                position: absolute;
                display: inline-block;
                padding: 9px;
                background-color: #f5f5f5;
                border: 1px solid #e3e3e3;
                border-radius: 4px;
                -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.05);
                box-shadow: inset 0 1px 1px rgba(0,0,0,.05);
                z-index: 200;

                .ms-span-right{
                    float: right;
                }
            }
            .ms-picker-box-up{
                bottom: 0px;
            }
            .ms-picker-box-down{
                top:34px;
            }
        }
    }
</style>
