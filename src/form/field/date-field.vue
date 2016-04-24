<!--
Created by Bane.Shi.
Copyright MoenSun
User: Bane.Shi
Date: 16/4/16
Time: 15:54-->
<template>
    <div class="ms-date-field" @click.stop="">
        <div class="ms-picker" v-show="calendarShow">
            <div v-el:date-picker class="ms-picker-box ms-picker-box-down" >
                <datepicker :value.sync="value"
                            :multiple="multiple"
                            :is-disabled="isDisabled"
                            :day-item-click="dayItemClick">
                </datepicker>
                <div>
                    <span>
                        <button type="button" class="btn btn-info btn-sm" @click="onToday()">今天</button>
                        <button type="button" class="btn btn-danger btn-sm" @click="onClean()">清空</button>
                    </span>
                    <span class="ms-span-right">
                        <button type="button" class="btn btn-danger btn-sm" @click="onClose()">关闭</button>
                    </span>
                </div>
            </div>
        </div>
        <div class="input-group">
            <input v-el:date-field type="text" class="form-control" v-model="value" placeholder="{{placeholder}}">
            <div class="input-group-addon">
                <span class="glyphicon glyphicon-calendar ms-calendar" @click="showCalendar($event)"></span>
            </div>
        </div>

    </div>
</template>
<script>
    import Vue from "vue";
    import _ from "lodash";
    import moment from "moment";
    import datepicker from "../../picker/date/datepicker.vue";
    export default{
        name:'dateField',
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
                type:String,
                default:function () {
                    return "false";
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
            }
        },
        data(){
            let me = this;
            return{
                "calendarShow":false
            }
        },
        ready(){
            let me = this;
            $(document).on('click',function (e) {
                me.calendarShow = false;
            });
        },
        watch:{

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
            "dayItemClick":function () {
                let me = this;
                if(!(me.multiple=="true")){
                    me.calendarShow = false;
                }

            },
            "onClose":function () {
                let me = this;
                me.calendarShow = false;
            },
            "onClean":function () {
                let me = this;
                if(me.multiple === "true"){
                    me.value = [];
                }else {
                    me.value = "";
                }
            },
            "onToday":function () {
                let me = this;
                if(me.multiple === "true"){
                    me.value = [];
                    me.value.push(new Date());
                }else {
                    me.value = new Date();
                }
            }
        },
        components:{
            datepicker
        },
        beforeDestroy() {
            $(document).off('click');
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
