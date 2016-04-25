/**
 * Created by Bane.Shi.
 * Copyright MoenSun
 * User: Bane.Shi
 * Date: 16/4/24
 * Time: 19:08
 */
'use strict';
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

module.exports = MSDate;