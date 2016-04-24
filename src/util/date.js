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

module.exports = MSDate;