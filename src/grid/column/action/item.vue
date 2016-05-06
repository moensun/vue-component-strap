<!--
Created by Bane.Shi.
Copyright MoenSun
User: Bane.Shi
Date: 16/4/9
Time: 16:13-->
<template>
    <div v-if="!hidden" class="ms-grid-action-item">
        <div role="button"
             :class="[cls,{'ms-grid-action-item-disabled':actionDisabled}]"
             @click="handler()" @mouseover="showTooltip($event)" @mouseout="hideTooltip()">
            {{item.text}}
        </div>
        <div class="ms-grid-action-item-tooltip-box" v-if="tooltipShowCompute">
            <div class="ms-grid-action-item-tooltip" :style="[tooltipPosition]">
                    {{item.tooltip}}
            </div>
        </div>
    </div>
</template>
<script>
    import Vue from "vue";
    import _ from "lodash";
    export default{
        props:{
            "store":{
                twoWay:true,
            },
            "item":{
                type:Object,
                default:function () {
                    return {
                        "cls":null,
                        "text":null,
                        "tooltip":null
                    };
                }
            },
            "record":{
                twoWay:true,
                type:Object
            },
            "class":{

            }
        },
        data(){
            return{
                "tooltipShow":false,
                "tooltipPosition":{}
            }
        },
        ready(){
            let me = this;
        },
        computed:{
            "cls":function () {
                let me = this;
                let cls = {};
                if(me.item.cls && me.item.cls.replace(/\s/g,"")){
                    let clss = me.item.cls.split(" ");
                    _.forEach(clss,function (clsItem) {
                        clsItem = clsItem.replace(/\s/g,"");
                        if(clsItem){
                            cls[clsItem] = clsItem;
                        }
                    });
                }
                return cls;
            },
            "tooltipShowCompute":function () {
                let me = this;
                if(me.item.tooltip && me.tooltipShow==true){
                    return true;
                }
            },
            "actionDisabled":function () {
                let me = this;
                if(typeof me.item.isDisabled === 'function'){
                    return me.item.isDisabled(me.record,me.store);
                }
            },
            "hidden":function () {
                let me = this;
                if(typeof me.item.hidden === 'function'){
                    return me.item.hidden(me.record,me.store);
                }else {
                    return false;
                }
            }
        },
        methods:{
            handler:function () {
                let me = this;
                if(me.item.handler && (typeof me.item.handler == "function") ){
                    me.item.handler(me.record);
                }
            },
            "showTooltip":function (e) {
                let me = this;
                if(me.item.tooltip){
                    me.tooltipPosition = {"top":(e.y+15)+"px","left":(e.x+25)+"px"};
                    me.tooltipShow = true;
                }
            },
            "hideTooltip":function () {
                let me = this;
                me.tooltipShow = false;
            }
        },
        components:{

        }
    }
</script>
<style lang="less" scoped>
    .ms-grid-action-item{
        display: inline-block;
        margin: 3px;
        cursor: pointer;
        .ms-grid-action-item-tooltip-box{
            position: relative;
            .ms-grid-action-item-tooltip{
                position:fixed;
                border: 1px rgba(0, 0, 0, 0.3) solid;
                border-radius: 4px;
                padding: 5px;
                background: #868686;
                z-index: 1;
                color: white;
            }
        }
        .ms-grid-action-item-disabled{
            opacity: 0.3;
            cursor: default;
            pointer-events: none;
        }
    }

</style>
