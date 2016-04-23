<!--
Created by Bane.Shi.
Copyright MoenSun
User: Bane.Shi
Date: 16/4/22
Time: 23:55-->
<template>
    <div class="ms-paging">
        <div class="ms-paging-left">
            <span class="tbspacer"></span>
            <span class="glyphicon glyphicon-step-backward"
                  :class="{'ms-paging-disabled':isFirstPage}" @click="firstPage()"></span>
            <span class="tbspacer"></span>
            <span class="glyphicon glyphicon-chevron-left"
                  :class="{'ms-paging-disabled':isFirstPage}" @click="previousPage()"></span>
            <span class="tbspacer"></span>
            <span class="tbseparator"></span>
            <span>{{pageText}}</span>
            <input type="text" class="ms-paging-num" v-model="showNum">
            <span>of&nbsp;{{pageCount}}</span>
            <span class="tbseparator"></span>
            <span class="tbspacer"></span>
            <span class="glyphicon glyphicon-chevron-right"
                  :class="{'ms-paging-disabled':isLastPage}" @click="nextPage()"></span>
            <span class="tbspacer"></span>
            <span class="glyphicon glyphicon-step-forward"
                  :class="{'ms-paging-disabled':isLastPage}" @click="lastPage()"></span>
            <span class="tbspacer"></span>
            <span class="tbseparator"></span>
            <span class="glyphicon glyphicon-refresh" @click="refresh()"></span>
        </div>
        <div class="ms-paging-right">
            {{showText}} {{startRow}}-{{endRow}} of {{total}}
        </div>
    </div>
</template>
<script>
    export default{
        name:'paging',
        props:{
            "pageText":{
                type:String,
                default:function () {
                    return "Page";
                }
            },
            "showText":{
                type:String,
                default:function () {
                    return  "Displaying";
                }
            },
            "currentPage":{
                type:Number,
                default:function () {
                    return 0;
                }
            },
            "limit":{
                type:Number,
                default:function () {
                    return 20;
                }
            },
            "total":{
                type:Number,
                default:function () {
                    return 123;
                }
            }
        },
        data(){
            return {
                "showNum":0
            }
        },
        computed:{
            "pageCount":function () {
                let me = this;
                let page = me.total/me.limit;
                return Math.ceil(page);
            },
            "startRow":function () {
                let me = this;
                if(me.currentPage<1){
                    return 0;
                }else {
                    return (me.currentPage-1)*me.limit;
                }
            },
            "endRow":function () {
                let me = this;
                if(me.currentPage<me.pageCount){
                    return me.startRow + me.limit;
                }else {
                    return me.startRow + (me.total-(me.pageCount-1)*me.limit);
                }
            },
            "isFirstPage":function () {
                let me = this;
                return (me.currentPage <= 1);
            },
            "isLastPage":function () {
                let me = this;
                return ( me.currentPage >= me.pageCount );
            }
        },
        watch:{
            "currentPage":{
                handler:function (newValue,oldValue) {
                    let me = this;
                    me.showNum = newValue;
                },
                immediate:true
            }
        },
        methods:{
            "firstPage":function () {
                this.currentPage = 1;
            },
            "lastPage":function () {
                this.currentPage = this.pageCount;
            },
            "previousPage":function () {
                let me = this;
                if(me.currentPage>1){
                    me.currentPage = me.currentPage-1;
                }
            },
            "nextPage":function () {
                let me = this;
                if(me.currentPage<me.pageCount){
                    me.currentPage = me.currentPage+1;
                }
            },
            "refresh":function () {
                let me = this;
                let num = parseInt(me.showNum);
                if(!isNaN(num)){
                    if(num<1){
                        num = 1;
                    }else if (num > me.pageCount){
                        num = me.pageCount;
                    }
                }else {
                    num = 1;
                }
                me.currentPage = num;
                me.showNum  = num;
            }
        },
        components:{
        }
    }
</script>
<style lang="less" scoped>
    .ms-paging{
        border: 1px #ddd solid;
        line-height: 34px;
        .glyphicon{
            cursor: pointer;
        }
        .tbspacer{
            width: 5px;
            display: inline-block;
        }
        .tbseparator{
            display: inline-block;
            height: 18px;
            border-left: 1px #989898 solid;
            vertical-align: middle;
        }
        .ms-paging-num{
            width: 40px;
            height: 30px;
            vertical-align: middle;
            line-height: 30px;
            font-size: 14px;
            padding-left: 5px;
            outline: none;
        }
        .ms-paging-left{
            display: inline-block;
        }
        .ms-paging-right{
            display: inline-block;
            float: right;
            padding-right: 10px;
        }
        .ms-paging-disabled{
            opacity: 0.3;
            pointer-events: none;
        }
    }
</style>
