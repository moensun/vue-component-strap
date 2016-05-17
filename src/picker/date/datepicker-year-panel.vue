<!--
Created by Bane.Shi.
Copyright MoenSun
User: Bane.Shi
Date: 16/4/24
Time: 15:45-->
<template>
    <div class="ms-datepicker-year-panel">
        <table>
            <thead>
                <tr>
                    <th>
                        <button class="btn btn-sm btn-default" @click="previousYearScope()">
                            <span class="glyphicon glyphicon-chevron-left"></span>
                        </button>
                    </th>
                    <th colspan="3">
                        <button class="btn btn-sm btn-default" disabled>
                            {{yearScope.start}}-{{yearScope.end}}
                        </button>
                    </th>
                    <th>
                        <button class="btn btn-sm btn-default" @click="nextYearScope()">
                            <span class="glyphicon glyphicon-chevron-right"></span>
                        </button>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(yearRowIndex,yearRow) in yearArr">
                    <td v-for="(yearCellIndex,yearCell) in  yearRow">
                        <datepicker-year :year-item="yearCell"
                                         :current-year.sync="currentYear"
                                         :view-type.sync="viewType">
                        </datepicker-year>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
    import datepickerMixin from "./datepickerMixin";

    import datepickerYear from "./datepicker-year.vue";

    export default{
        name:'datepickerYearPanel',
        mixins:[datepickerMixin],
        props:{
            "currentYear":{
                twoWay:true,
                default:function () {
                    return (new Date()).getFullYear();
                }
            },
            "viewType":{
                type:String,
                twoWay:true
            }
        },
        data(){
            return {
                "yearScope":{
                    "start":null,
                    "end":null
                }
            }
        },
        computed:{
            "yearArr":function () {
                let me = this;
                let remainder = me.currentYear%20;
                if(!me.yearScope.start){
                    me.yearScope.start = me.currentYear-remainder+1;
                }
                if(!me.yearScope.end){
                    me.yearScope.end = me.currentYear+(20-remainder);
                }

                let years = [];
                for(var i = me.yearScope.start ; i<=me.yearScope.end;i++ ){
                    years.push(i);
                }
                return me.split(years,5);
            }
        },
        methods:{
            "previousYearScope":function () {
                let me = this;
                me.yearScope.start = me.yearScope.start -20;
                me.yearScope.end = me.yearScope.end-20;
            },
            "nextYearScope":function () {
                let me = this;
                me.yearScope.start = me.yearScope.start+20;
                me.yearScope.end = me.yearScope.end+20;
            }
        },
        components:{
            datepickerYear
        }
    }
</script>
<style lang="less" scoped>
    .ms-datepicker-year-panel{
        display: inline-block;
        button{width: 100%;}
    }
</style>
