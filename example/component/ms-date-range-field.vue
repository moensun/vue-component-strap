<!--
Created by Bane.Shi.
Copyright MoenSun
User: Bane.Shi
Date: 16/4/22
Time: 14:32-->
<template>
<div>
    <div>
        <ms-datepicker-range></ms-datepicker-range>
    </div>
    <div>
        <ms-datepicker-range
                :selected-dates.sync="selectedDates1"
                :start-date.sync="startDate1"
                :end-date.sync="endDate1">
        </ms-datepicker-range>
        <div><button @click="setDates">赋值</button>
            <button @click="setDates1">赋值</button>
        </div>
        <div>{{selectedDates1}}</div>
    </div>
    <div>
        <div style="max-height: 100px;overflow-y: auto">
            <div v-for="(dateIndex,date) in selectedDates">{{date}}</div>
        </div>
    </div>
    <div>
        <ms-date-range-field :selected-dates.sync="selectedDates"
                             :start-date.sync="startDate"
                             :end-date.sync="endDate" :with-time=true 
                             :is-focus=true
                             :is-disabled="isDisabled">
        </ms-date-range-field>
    </div>
    <div>
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>参数</th>
                    <th>类型</th>
                    <th>释义</th>
                    <th>是否双向绑定</th>
                    <th>默认值</th>
                    <th>补充说明</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>startDay</td>
                    <td>String</td>
                    <td>开始时间</td>
                    <td>是</td>
                    <td>无</td>
                    <td>startDay 和 endDay 需要同时设置</td>
                </tr>
                <tr>
                    <td>endDay</td>
                    <td>String</td>
                    <td>结束时间</td>
                    <td>是</td>
                    <td>无</td>
                    <td>startDay 和 endDay 需要同时设置</td>
                </tr>
                <tr>
                    <td>selectedDates</td>
                    <td>Array</td>
                    <td>选中日期</td>
                    <td>是</td>
                    <td>无</td>
                    <td>数组型的字符串日期</td>
                </tr>
                <tr>
                    <td>dateFormat</td>
                    <td>String</td>
                    <td>日期格式</td>
                    <td>否</td>
                    <td>YYYY-MM-DD</td>
                    <td>遵循moment的时间格式化</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
</template>
<script>
    import {msDateRangeField} from "../../src/index";
    import {msDatepickerRange} from "../../src/index";
    export default{
        data(){
            return {
                "startDate":"2016-11-1 12:06:07",
                "endDate":"2016-11-30 12:06:30",
                "selectedDates":[],
                "isDisabled":function (day) {
                    if(day.getDay() == 3){
                        return true;
                    }
                },
                "selectedDates1":[
                ],
                "startDate1":"2016-11-1 12:06:07",
                "endDate1":"2016-11-30 12:06:30",
            }
        },
        methods:{
            setDates:function() {
                let me = this;
                me.selectedDates1 = [
                    "2016-11-12",
                    "2016-11-16"
                ];
                me.startDate1 = "2016-11-1";
                me.endDate1 = "2016-11-20";
            },
            setDates1: function() {
                            let me = this;
                me.selectedDates = [
                    "2016-11-12",
                    "2016-11-16"
                ];
                me.startDate = "2016-11-1";
                me.endDate = "2016-11-20";
            }
        },
        components:{
            msDateRangeField,
            msDatepickerRange
        }
    }
</script>
<style>

</style>
