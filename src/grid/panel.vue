<template>
    <div class="grid-panel">
        <div class="grid-panel-out-box">
            <div :style="[panelInnerBox]">
                <div v-el:grid-header class="grid-header table-responsive"
                     :style="[headerLineStyle]">
                    <table class="table" :class="{'table-bordered':showRowLines}">
                        <thead>
                        <tr>
                            <th v-for="(colIndex,column) in columns"
                                is="grid-header"
                                :flex-count="flexCount"
                                :surplus-width="surplusWidth"
                                :setting="column"
                            ></th>
                        </tr>
                        </thead>
                    </table>
                </div>
                <div v-el:grid-header-line class="grid-header-line"></div>
                <div class="grid-body-box">
                    <div v-el:grid-body class="grid-body table-responsive" :style="[bodyHeight,minHeight]">
                        <table class="table table-striped" :class="{'table-bordered':showRowLines}">
                            <tbody>
                            <tr v-for="(rowIndex,record) in store">
                                <td v-for="(colIndex,column) in columns"
                                    :is="(column.type?column.type:'text-column' )"
                                    :store.sync="store"
                                    :record.sync="record"
                                    :flex-count="flexCount"
                                    :surplus-width="surplusWidth"
                                    :setting="column"
                                ></td>
                            </tr>
                            </tbody>
                        </table>
                        <div v-if="isEmpty">{{{emptyText}}}</div>
                    </div>
                    <div class="ms-grid-loading" v-if="isLoading" :style="[loadingBackground]"></div>
                </div>
                <div v-el:grid-footer class="grid-footer">
                    <component v-if="paging" :is="(paging.theme?paging.theme:'paging')"
                               :page-text="paging.pageText"
                               :show-text="paging.showText"
                               :current-page.sync="currentPage"
                               :limit.sync="limit"
                               :total.sync="total" >
                    </component>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Vue from "vue";
    import _ from "lodash";
    import gridHeader from "./header/header.vue";
    import paging from "../toolbar/paging.vue";
    import textColumn from "./column/text.vue";
    import linkColumn from "./column/link.vue";
    import actionColumn from "./column/action.vue";
    import images from "../images/index";
    export default{
        name:'gridPanel',
        props:{
            "width":{
                type:Number
            },
            "height":{
                type:Number
            },
            "emptyText":{
                type:String
            },
            "isLoading":{
                type:Boolean,
                twoWay:true,
                default:function () {
                    return false;
                }
            },
            "rowLines":{
                type:Boolean,
                default:function () {
                    return false;
                }
            },
            "store":{
                type:Array,
                default:function () {
                    return [];
                }
            },
            "columns":{
                type:Array,
                default:function () {
                    return [];
                }
            },
            "autoScroll":{
                type:String,
                default:function () {
                    return "false";
                }
            },
            "paging":{
                type:Object,
            },
            "currentPage":{
                type:Number,
                twoWay:true,
                default:function () {
                    return 0;
                }
            },
            "limit":{
                type:Number,
                twoWay:true,
                default:function () {
                    return 20;
                }
            },
            "total":{
                type:Number,
                twoWay:true,
                default:function () {
                    return 0;
                }
            }
        },
        data(){
            return {
                "clientWidth":0,
                "bodyHeight":{},
                "isBodyScrollShow":false,
                "loadingBackground":{
                    "background":"url("+images.loading64+") rgba(0, 0, 0, 0.3) no-repeat center"
                }
            }
        },
        ready(){
            let me = this;
            me.clientWidth = me.$el.clientWidth;
            me.$emit('computeBodyHeight');
        },
        watch:{
            "height":function () {
                this.$emit('computeBodyHeight');
            }
        },
        computed:{
            "showRowLines":function () {
                let me = this;
                if(me.rowLines){
                    return true;
                }
            },
            "panelInnerBox":function () {
                let me = this;
                let widthCount = 0;
                _.forEach(me.columns,function (column) {
                    if(column.width && !column.flex){
                        widthCount += column.width;
                    }
                });
                let minFlexWithCount = 20 * me.flexCount;
                if(widthCount+minFlexWithCount > me.$el.clientWidth){
                    me.clientWidth = widthCount+minFlexWithCount;
                    return {
                        "width":me.clientWidth+'px'
                    };
                }else {
                    me.clientWidth = me.$el.clientWidth;
                    return {
                        "width":'100%'
                    }
                }
            },
            "headerLineStyle":function (){
                let me = this;
                let headerStyle = {};
                if(me.showRowLines){
                    headerStyle = {"borderTop":"1px solid #ddd"};
                }
                if(me.isBodyScrollShow){
                   // headerStyle = Object.assign(headerStyle,{"paddingRight":"14px"});
                    if(me.showRowLines){
                       // headerStyle = Object.assign(headerStyle,{"borderRight":"1px solid #ddd"});
                    }
                }
                return headerStyle;
            },
            "flexCount":function () {
                let me = this;
                let flexCount = 0;
                _.forEach(me.columns,function (column) {
                    if(!column.width ){
                        flexCount += (column.flex?column.flex:1);
                    }
                });
                return flexCount;
            },
            "surplusWidth":function () {

                let me = this;
               // me.clientWidth = me.$el.clientWidth;
                let widthCount = 0;
                _.forEach(me.columns,function (column) {
                    if(column.width && !column.flex){
                        widthCount += column.width;
                    }
                });
                return me.clientWidth-widthCount;
            },
            "isEmpty":function () {
                let me = this;
                return (!me.store  || me.store.length == 0 );
            },
            "minHeight":function () {
                let me = this;
                if(!me.height){
                    return {"minHeight":"100px"};
                }else {
                    return {};
                }
            }
        },
        methods:{

        },
        events:{
            /**
             * 计算body部分的高度
             */
            "computeBodyHeight":function () {
                let me = this;
                if(me.height){
                    let bodyHeight = me.height - (me.$els.gridHeader.clientHeight + me.$els.gridFooter.clientHeight + me.$els.gridHeaderLine.clientHeight);
                    me.bodyHeight = {"height":bodyHeight+'px'};
                }else {
                    me.bodyHeight = {};
                }
                Vue.nextTick(function () {
                    me.$emit("judgeShowScroll");
                });
            },
            /**
             * 计算是否头部要适配滚动条
             */
            "judgeShowScroll":function () {
                let me = this;
                let gridBody = me.$els.gridBody;
                if(gridBody.clientHeight < gridBody.scrollHeight ){
                    me.isBodyScrollShow = true;
                }else {
                    me.isBodyScrollShow = false;
                }
            }
        },
        components:{
            gridHeader,
            paging,
            textColumn,
            linkColumn,
            actionColumn
        }
    }
</script>
<style lang="less" scoped>
    .grid-panel{
        width: 100%;
        position: relative;
        .grid-panel-out-box{
            width: 100%;
            overflow-x: auto;
        }
        .grid-header{
            &.table-responsive{
                @media screen and (max-width: 767px){
                    margin-bottom: 0px;
                }
            }
            &.scroll-show{
                 /*padding-right: 14px;*/
             }
            .table-bordered{border: 0px;}
            .table{
                margin-bottom: 0px;
                thead{
                    tr{
                        th{
                            min-height: 47px;
                            border-bottom: 0px;
                            vertical-align: middle;
                        }
                    }
                }
            }
        }
        .grid-header-line{
            border-bottom: 2px solid #ddd;
        }
        .grid-body-box{
            position: relative;
            .ms-grid-loading{
                position: absolute;
                top: 0px;
                bottom: 0px;
                left: 0px;
                right: 0px;
            }
            .grid-body{
                position: relative;
                overflow-y: auto;
                .table{
                    margin-bottom: 0px;
                    tr{
                        min-height: 47px;
                        td{
                            vertical-align: middle;
                        }
                    }
                }
            }
        }

        .grid-footer{

        }
    }
</style>
