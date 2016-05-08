/**
 * Created by Bane.Shi.
 * Copyright MoenSun
 * User: Bane.Shi
 * Date: 16/4/22
 * Time: 12:34
 */
'use strict';
module.exports = {
    'main':{
        name:'main',
        component:require("../component/main.vue")
    },
    "ms-modal":{
        name:"ms-modal",
        component:require("../component/ms-modal.vue")
    },
    "ms-alert":{
        name:"ms-alert",
        component:require("../component/ms-alert.vue")
    },
    "ms-confirm":{
        name:"ms-confirm",
        component:require("../component/ms-confirm.vue")
    },
    "ms-datepicker":{
        name:"ms-datepicker",
        component:require("../component/ms-datepicker.vue")
    },
    "ms-date-field":{
        name:'ms-date-field',
        component:require("../component/ms-date-field.vue")
    },
    "ms-date-range-field":{
        name:'ms-date-range-field',
        component:require("../component/ms-date-range-field.vue")
    },
    "ms-date-range-single-field":{
        name:'ms-date-range-single-field',
        component:require("../component/ms-date-range-single-field.vue")
    },
    "ms-grid-panel":{
        name:'ms-grid-panel',
        component:require("../component/ms-grid.vue")
    },
    '*':{
        component:require("../component/main.vue")
    }
}