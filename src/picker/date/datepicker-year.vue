<!--
Created by Bane.Shi.
Copyright MoenSun
User: Bane.Shi
Date: 16/4/24
Time: 15:44-->
<template>
    <button type="button" class="btn btn-sm btn-default"
            :class="{'is-current-year':isCurrentYear}"
            @click="selectYear()">
        <span>{{yearItem}}</span>
    </button>
</template>
<script>
    export default{
        name:'datepickerYear',
        props:{
            "yearItem":{},
            "viewType":{
                twoWay:true,
            },
            "currentYear":{
                twoWay:true,
                default:function () {
                    return (new Date()).getFullYear();
                }
            }
        },
        computed:{
            "isCurrentYear":function () {
                let me = this;
                return (me.currentYear == me.yearItem);
            }
        },
        methods:{
            "selectYear":function () {
                let me = this;
                me.currentYear = me.yearItem;
                me.viewType = "day";
            }
        },
        components:{
        }
    }
</script>
<style lang="less" scoped>
    .is-current-year{
        color: #fff;
        background-color: #31b0d5;
        border-color: #269abc;
    }
</style>
