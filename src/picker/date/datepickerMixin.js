/**
 * Created by Bane.Shi.
 * Copyright MoenSun
 * User: Bane.Shi
 * Date: 16/4/22
 * Time: 14:51
 */
'use strict';
import _ from "lodash";
import moment from "moment";
import Vue from "vue";
export default {
    props:{
        "weekDays":{
            type:Array,
            default:function () {
                return ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
            }
        },
        "months":{
            type:Array,
            default:function () {
                return ["January","February","March","April","May","June","July","August","September","October","November","December"];
            }
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
    },
    data(){
        return {
            "DAYS_IN_MONTH":[31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
        }
    },
    filters:{
        "dayFormat":function (date) {
            if(date<10){
                return "0"+date;
            }else {
                return date;
            }
        }
    },
    methods:{
        "dateAdapter":function (date) {
            if(typeof date === 'object'){
                return date;
            }else {
                return date.replace(/-/g,'/');
            }

        },
        "getDaysInMonth":function (year,month) {
            let me = this;
            return month === 1 && year % 4 === 0 &&
            (year % 100 !== 0 || year % 400 === 0) ? 29 : me.DAYS_IN_MONTH[month];
        },
        "getDates":function (startDate,n) {

            var dates = new Array(n), current = new Date(startDate), i = 0, date;
            while (i < n) {
                date = new Date(current);
                dates[i++] = date;
                current.setDate(current.getDate() + 1);
            }
            return dates;
        },
        "split":function (arr, size) {
            let arrays = [];
            while (arr.length > 0) {
                arrays.push(arr.splice(0, size));
            }
            return arrays;
        },
        "isSameDay":function (d1,d2) {
            return (d1.getFullYear()==d2.getFullYear()
            && d1.getMonth()==d2.getMonth()
            && d1.getDate()==d2.getDate() );
        }
    }
}