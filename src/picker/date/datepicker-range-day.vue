<!--
Created by Bane.Shi.
Copyright MoenSun
User: Bane.Shi
Date: 16/4/22
Time: 17:11-->
<template>
    <button type="button" class="btn btn-sm btn-default" v-show="isCurrentMonth"
            :class="{'ms-today':(isToday && !isSelected),'ms-select-day':isSelected,'is-disabled':itemDisabled}"
            @click="selectDay()"
            @contextmenu.prevent="cancelDay()">
        <span>{{dayItem | dayFormat}}</span>
    </button>
</template>
<script>
    import datepickerMixin from "./datepickerMixin";
    export default{
        name:"datepickerRangeDay",
        mixins:[datepickerMixin],
        props:{
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
        },
        computed:{
            "isCurrentMonth":function () {
                return this.dayItem.getMonth() == this.currentMonth;
            },
            "isSelected":function () {
                let me = this;
                let result = false;
                _.forEach(me.selectedDates,function (selectedDate) {
                    if(!(selectedDate instanceof Date)){
                        selectedDate = new Date(selectedDate);
                    }
                    if(selectedDate.getFullYear()== me.dayItem.getFullYear()
                            && selectedDate.getMonth()==me.dayItem.getMonth()
                            && selectedDate.getDate()==me.dayItem.getDate()  ){
                        result = true;
                    }
                });
                return result;
            },
            "isToday":function () {
                let me = this;
                let day = me.dayItem;
                let today = new Date();
                return (day.getFullYear()===today.getFullYear() && day.getMonth()===today.getMonth() && day.getDate()===today.getDate());
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
                if((!me.startDay && !me.endDay) || (me.startDay && me.endDay && !me.isSameDay(me.startDay,me.endDay))){
                    me.startDay = new Date(me.dayItem);
                    me.endDay = new Date(me.dayItem);
                }else if( me.startDay && me.endDay && me.isSameDay(me.startDay,me.endDay)){
                    if(me.dayItem > me.startDay){
                        me.endDay = me.dayItem;
                    }else {
                        me.startDay = me.dayItem;
                    }
                }
                me.selectedDates = [];
                //me.setSelectedDates();
            },
            "cancelDay":function () {
               let me = this;
                let dates = _.cloneDeep(me.selectedDates);
                let index = -1;
                _.forEach(dates,function (date,itemIndex) {
                    if(me.dayItem.getFullYear() == date.getFullYear()
                            && me.dayItem.getMonth()==date.getMonth()
                            && me.dayItem.getDate()==date.getDate()){
                        index=itemIndex;
                    }
                });
                if(index >=0 ){
                    dates.splice(index,1);
                }
                me.selectedDates = dates;
            }
        },
        components:{
        }
    }
</script>
<style lang="less" scoped>
    .ms-today{color: #00b3ee;}
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
