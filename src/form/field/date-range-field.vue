<!--
Created by Bane.Shi.
Copyright MoenSun
User: Bane.Shi
Date: 16/4/22
Time: 14:26-->
<template>
    <div class="ms-date-range-field">
        <div class="ms-picker" v-show="calendarShow">
            <div v-el:date-picker class="ms-picker-box ms-picker-box-down">
                <div class="ms-datepicker-table">
                    <div class="ms-datepicker-tr">
                        <div class="ms-datepicker-td ms-btn-previous">
                            <button class="btn btn-default" @click="previous()">
                                <span class="glyphicon glyphicon-chevron-left"></span>
                            </button>
                        </div>
                        <div class="ms-datepicker-td" v-for="(monthIndex,month) in showMonths">
                            <datepicker-range :current-date="month"
                                              :start-day.sync="startDayObj"
                                              :end-day.sync="endDayObj"
                                              :selected-dates.sync="selectedDatesObj"
                                              :is-disabled="isDisabled">
                            </datepicker-range>
                        </div>
                        <div class="ms-datepicker-td ms-btn-next">
                            <button class="btn btn-default" @click="next()">
                                <span class="glyphicon glyphicon-chevron-right"></span>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="ms-datepicker-table" style="width: 100%" v-if="withTime">
                    <div class="ms-datepicker-tr">
                        <div class="ms-datepicker-td">
                            <datepicker-time-panel :title="startTimeText" :date.sync="startDayObj"></datepicker-time-panel>
                        </div>
                        <div class="ms-datepicker-td">
                            <datepicker-time-panel :title="endTimeText" :date.sync="endDayObj"></datepicker-time-panel>
                        </div>

                    </div>
                </div>
                <div>
                        <span>
                            <!--<button type="button" class="btn btn-info btn-sm" @click="onToday()">{{todayText}}</button>-->
                            <button type="button" class="btn btn-danger btn-sm" @click="onClean()">{{cleanText}}</button>
                        </span>
                        <span class="ms-span-right">
                            <button type="button" class="btn btn-danger btn-sm" @click="onClose()">{{closeText}}</button>
                        </span>
                </div>
            </div>
        </div>
        <div class="input-group">
            <input v-el:date-field type="text" class="form-control" v-model="dateRange" placeholder="{{placeholder}}" @click="showCalendarInput($event)" >
            <div class="input-group-addon ms-calendar" @click="showCalendar($event)">
                <span class="glyphicon glyphicon-calendar" ></span>
            </div>
        </div>
    </div>
</template>
<script>
    import Vue from "vue";
    import moment from "moment";
    import MSUtil from "../../util/date";
    import dateFieldMixin from "./mixin/dateFieldMixin";
    import datepickerRange from "../../picker/date/datepicker-range.vue";
    import datepickerTimePanel from "../../picker/date/datepicker-time-panel.vue";
    export default{
        name:'dateRangeField',
        mixins:[dateFieldMixin],
        replace:false,
        props:{
            "startDate":{
                type:String,
                twoWay:true
            },
            "endDate":{
                type:String,
                twoWay:true
            },
            "startTimeText":{
                type:String,
                default:function () {
                    return "开始:";
                }
            },
            "startTime":{
                "hour":null
            },
            "endTimeText":{
                type:String,
                default:function () {
                    return "结束:";
                }
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
                    return "YYYY-MM-DD HH:mm:ss";
                }
            },
            "dateItemsFormat":{
                type:String,
                default:function () {
                    return "YYYY-MM-DD";
                }
            },
            "withTime":{
                type:Boolean,
                default:function () {
                    return false;
                }
            },
            "isFocus":{
                type:Boolean,
                default:function(){
                    return false;
                }
            }
        },
        data(){
            return {
                "calendarShow":false,
                "startDayObj":null,
                "endDayObj":null,
                "selectedDatesObj":[],
                "showMonths":[
                    (new Date()),
                    ( new Date( (new Date()).getFullYear(),(new Date()).getMonth()+1 ) ),
                ]
            }
        },
        ready(){
            let me = this;
            if(me.startDay){
                let month1 = new Date(me.dateAdapter(me.startDay));
                let month2 = _.cloneDeep(month1);
                month2.setMonth(month2.getMonth()+1);
                me.showMonths = [month1,month2];
            }

            me.eventNamespace = _.uniqueId(".date_field_click_");
            $(document).on('click'+me.eventNamespace,function (e) {
                let el = me.$el;
                if(!el.contains(e.target)){
                    me.calendarShow = false;
                }
            });
        },
        computed:{
            "monthsRange":function(){

            },
            "dateRange":function(){
                let me = this;
                if(me.startDate && me.endDate){
                    return me.startDate+"~"+me.endDate;
                }else {
                    return "";
                }
            }
        },
        watch:{
            "startDate":{
                handler:function (newValue,oldValue) {
                    let me = this;
                    if(newValue && newValue!=oldValue){
                        me.startDayObj = new Date(me.dateAdapter(newValue));
                    }
                    if(!newValue){
                       // me.startDayObj = new Date();
                    }
                },
                immediate:true
            },
            "endDate":{
                handler:function (newValue,oldValue) {
                    let me = this;
                    if(newValue && newValue!=oldValue){
                        me.endDayObj = new Date(me.dateAdapter(newValue));
                    }
                    if(!newValue){
                       // me.endDayObj = new Date();
                    }
                },
                immediate:true
            },
            "startDayObj":{
                handler:function (newValue,oldValue) {
                    let me = this;
                    if(newValue && JSON.stringify(newValue)!=JSON.stringify(oldValue)){
                        me.startDate = moment(newValue).format(me.dateFormat);
                    }
                },
                deep: true
                //immediate:true
            },
            "endDayObj":{
                handler:function (newValue,oldValue) {
                    let me = this;
                    if(newValue && JSON.stringify(newValue)!=JSON.stringify(oldValue)){
                        me.endDate = moment(newValue).format(me.dateFormat);
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
                            dates.push(moment(date).format(me.dateItemsFormat));
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
        methods:{
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
            "dateAdapter":function (date) {
                if(typeof date === 'object'){
                    return date;
                }else {
                    return String(date).replace(/-/g,'/');
                }

            },
            "previous":function () {
                let me = this;
                let month1 = new Date(me.showMonths[0]);
                month1.setMonth(month1.getMonth()-1);
                let month2 = new Date(me.showMonths[1]);
                month2.setMonth(month2.getMonth()-1);
                me.showMonths = [month1,month2];
            },
            "next":function () {
                let me = this;
                let month1 = new Date(me.showMonths[0]);
                month1.setMonth(month1.getMonth()+1);
                let month2 = new Date(me.showMonths[1]);
                month2.setMonth(month2.getMonth()+1);
                me.showMonths = [month1,month2];
            },
            "onClose":function () {
                let me = this;
                me.calendarShow = false;
            },
            "onClean":function () {
                let me = this;
                me.startDayObj = null;
                me.endDayObj = null;
                me.startDay = "";
                me.endDay = "";
                me.selectedDatesObj = [];
                me.selectedDates = [];
            },
            "onToday":function () {
                let me = this;
                me.startDayObj = new Date();
                me.endDayObj = new Date();
            }
        },
        components:{
            datepickerRange,
            datepickerTimePanel
        }
    }
</script>
<style lang="less" scoped>
    .ms-date-range-field{
        .ms-calendar{
            cursor: pointer;
        }
        .ms-picker{
            position:relative;
            button{
                outline: none;
            }
            .ms-picker-box{
                position: absolute;
                display: inline-block;
                padding: 9px;
                background-color: #f5f5f5;
                border: 1px solid #e3e3e3;
                border-radius: 4px;
                box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.05);
                z-index: 200;
                .ms-datepicker-table{
                    display: table;
                    .ms-datepicker-tr{
                        display: table-row;
                        .ms-datepicker-td{
                            display: table-cell;
                            vertical-align: top;
                            &.ms-btn-previous{
                                vertical-align: top;
                                button{
                                    box-sizing: initial;
                                    height:100%;
                                }
                            }
                            &.ms-btn-next{
                                vertical-align: top;
                                button{
                                    box-sizing: initial;
                                    height:100%;
                                }
                            }
                        }
                    }
                }
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
