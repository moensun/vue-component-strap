<!--
Created by Bane.Shi.
Copyright MoenSun
User: Bane.Shi
Date: 16/4/25
Time: 12:00-->
<template>
    <button type="button" class="btn btn-sm btn-default"
            :class="{'ms-today':(isToday && !isSelected),'ms-select-day':isSelected,'other-mouth':!isCurrentMonth,'is-disabled':itemDisabled}"
            @click="selectDay()" >
        <span>{{dayItem | dayFormat}}</span>
    </button>
</template>
<script>
    import MSUtil from "../../util/index";
    import datepickerMixin from "./datepickerMixin";
    export default{
        name:"datepickerRangeDay",
        mixins:[datepickerMixin],
        props:{
            "currentDate":{
                type:Date,
                twoWay:true
            },
            "dayItem":{},
            "startDay":{
                type:Date,
                twoWay:true
            },
            "endDay":{
                type:Date,
                twoWay:true
            },
            "currentMonth":{},
            "selectedDates":{
                type:Array,
                twoWay:true,
                default:function () {
                    return [];
                }
            },
            "multiple":{
                type:Boolean,
                default:function () {
                    return false;
                }
            },
            "dayItemClick":{
                type:Function
            }
        },
        computed:{
            "isCurrentMonth":function () {
                return this.dayItem.getMonth() == this.currentMonth;
            },
            "isSelected":function () {
                let me = this;
                if(me.multiple && _.isArray(me.selectedDates)){
                    let result = false;
                    _.forEach(me.selectedDates,function (selectedDate) {
                        if(selectedDate.getFullYear()== me.dayItem.getFullYear()
                                && selectedDate.getMonth()==me.dayItem.getMonth()
                                && selectedDate.getDate()==me.dayItem.getDate()  ){
                            result = true;
                        }
                    });
                    return result;
                }else {
                    if(me.selectedDates && _.isArray(me.selectedDates) && me.selectedDates.length==1){
                        return MSUtil.MSDate.isSameDay(me.selectedDates[0],me.dayItem);
                    }

                }

            },
            "isToday":function () {
                let me = this;
                let day = me.dayItem;
                let today = new Date();
                return MSUtil.MSDate.isSameDay(day,today);
            },
            "itemDisabled":function () {
                let me = this;
                if(typeof me.isDisabled == 'function'){
                    return me.isDisabled(me.dayItem);
                }
            }
        },
        filters:{
            "dayFormat":function (date) {
                date = new Date(date);
                let day  = date.getDate();
                if(day<10){
                    return "0"+day;
                }else {
                    return day;
                }
            }
        },
        methods:{
            "selectDay":function () {
                let me = this;
                if(! MSUtil.MSDate.isSameMonth(me.currentDate,me.dayItem)){
                    me.currentDate = me.dayItem;
                }
                if(me.multiple){
                    let dates = _.cloneDeep(me.selectedDates);
                    if(!_.isArray(me.selectedDates)){
                        dates = [];
                    }
                    let dateIndex = -1;
                    _.forEach(dates,function (date,index) {
                        if(MSUtil.MSDate.isSameDay(me.dayItem,date)){
                            dateIndex = index ;
                        }
                    });
                    if(dateIndex > -1){
                        dates.splice(dateIndex,1);
                    }else {
                        dates.push(me.dayItem);
                    }
                    me.selectedDates = dates;
                }else {
                    let dates = [];
                    dates.push(me.dayItem);
                    me.selectedDates = dates;
                }
                if(typeof me.dayItemClick == 'function'){
                    me.dayItemClick();
                }
            }
        },
        components:{
        }
    }
</script>
<style lang="less" scoped>
    .ms-today{color: #00b3ee;}
    .other-mouth{color: #777;}
    .ms-select-day{
        color: #fff;
        background-color: #31b0d5;
        border-color: #269abc;
    }
    .is-disabled{
        opacity: 0.3;
        pointer-events: none;
    }
</style>
