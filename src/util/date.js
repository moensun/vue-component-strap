/**
 * Created by Bane.Shi.
 * Copyright MoenSun
 * User: Bane.Shi
 * Date: 16/4/24
 * Time: 19:08
 */
'use strict';
import _ from "lodash";
import moment from "moment";
function MSDate(date) {
    if(!(this instanceof MSDate)){
        return new MSDate(date);
    }
}
MSDate.dateAdapter = function (date) {
    if(typeof date === 'object'){
        return date;
    }else {
        return String(date).replace(/-/g,'/');
    }
}
MSDate.isSameDay = function (d1,d2) {
    return (d1.getFullYear()==d2.getFullYear()
    && d1.getMonth()==d2.getMonth()
    && d1.getDate()==d2.getDate() );
}

MSDate.isSameMonth = function (d1,d2) {
    return (d1.getFullYear()==d2.getFullYear()
    && d1.getMonth()==d2.getMonth() );
}

MSDate.dayInArray = function (day,array) {
    let result = false;
    if(_.isArray(array) && array.length>0 ){
        _.forEach(array,function (date) {
            if(MSDate.isSameDay(day,date)){
                return true;
            }
        });
    }
    return result;
}

MSDate.stringArrayToDateArray = function (array) {
    let dates = [];
    if(_.isArray(array) && array.length>0 ){
        _.forEach(array,function (date) {
            dates.push(new Date(MSDate.dateAdapter(date)));
        });
    }
    return dates;
}

MSDate.dateArrayToStringArray = function (array,format) {
    let dates = [];
    if(_.isArray(array) && array.length>0 ){
        _.forEach(array,function (date) {
            dates.push(moment(date).format(format));
        });
    }
    return dates;
}

module.exports = MSDate;