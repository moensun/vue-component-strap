<!--
Created by Bane.Shi.
Copyright MoenSun
User: Bane.Shi
Date: 16/4/24
Time: 13:02-->
<template>
    <div class="ms-datepicker-month-panel">
        <table>
            <thead>
                <tr>
                    <td>
                        <button type="button" class="btn btn-sm btn-default" @click="previousYear()">
                            <span class="glyphicon glyphicon-chevron-left"></span>
                        </button>
                    </td>
                    <td>
                        <button type="button" class="btn btn-sm btn-default" @click="showYearView()">{{currentYear}}</button>
                    </td>
                    <td>
                        <button type="button" class="btn btn-sm btn-default" @click="nextYear()">
                            <span class="glyphicon glyphicon-chevron-right"></span>
                        </button>
                    </td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(monthRowIndex,monthRow) in monthArr">
                    <td v-for="(monthCellIndex,monthCell) in monthRow">
                        <datepicker-month :month-item="monthCell"
                                          :row-index="monthRowIndex"
                                          :cell-index="monthCellIndex"
                                          :current-month.sync="currentMonth"
                                          :view-type.sync="viewType">
                        </datepicker-month>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
    import _ from "lodash";
    import datepickerMonth from "./datepicker-month.vue";
    import datepickerMixin from "./datepickerMixin";
    export default{
        name:'datepickerMonthPanel',
        mixins:[datepickerMixin],
        props:{
            "currentYear":{
                twoWay:true,
                default:function () {
                    return (new Date()).getFullYear();
                }
            },
            "currentMonth":{
                twoWay:true,
                default:function () {
                    return (new Date()).getMonth();
                }
            },
            "viewType":{
                twoWay:true
            }
        },
        computed:{
            "monthArr":function () {
                let me = this;
                let months = _.cloneDeep(me.months);
                return me.split(months,3);
            }
        },
        methods:{
            "previousYear":function () {
                let me = this;
                me.currentYear = me.currentYear-1;
            },
            "nextYear":function () {
                let me = this;
                me.currentYear = me.currentYear+1;
            },
            "showYearView":function () {
                let me = this;
                me.viewType = "year";
            }
        },
        components:{
            datepickerMonth
        }
    }
</script>
<style lang="less" scoped>
    .ms-datepicker-month-panel{
        display: inline-block;
        button{width: 100%;}
    }
</style>
