<!--
Created by Bane.Shi.
Copyright MoenSun
User: Bane.Shi
Date: 16/4/24
Time: 12:40-->
<template>
    <button type="button" class="btn btn-sm btn-default"
            @click="selectMouth()"
            :class="{'is-current-month':isCurrentMonth}">
        <span>{{monthItem}}</span>
    </button>
</template>
<script>
    export default{
        props:{
            "monthItem":{},
            "rowIndex":{
                type:Number
            },
            "cellIndex":{type:Number},
            "currentMonth":{
                twoWay:true,
                default:function () {
                    return (new Date()).getMonth();
                }
            }
        },
        computed:{
            "isCurrentMonth":function () {
                let me = this;
                return (me.currentMonth==(me.rowIndex*3+me.cellIndex));
            }
        },
        methods:{
            "selectMouth":function () {
                let me = this;
                me.currentMonth = me.rowIndex*3+me.cellIndex;
            }
        },
        components:{
        }
    }
</script>
<style lang="less" scoped>
    .is-current-month{
        color: #fff;
        background-color: #31b0d5;
        border-color: #269abc;
    }
</style>
