<!--
Created by Bane.Shi.
Copyright MoenSun
User: Bane.Shi
Date: 16/4/9
Time: 16:13-->
<template>
    <div role="button" class="ms-grid-action-item"
         :class="[cls,{'ms-grid-action-item-disabled':actionDisabled}]"
         @click="handler()">
    </div>
</template>
<script>
    import Vue from "vue";
    import _ from "lodash";
    export default{
        props:{
            "store":{},
            "item":{
                type:Object,
                default:function () {
                    return {
                        "cls":null
                    };
                }
            },
            "record":{
                type:Object
            },
            "class":{

            }
        },
        data(){
            return{

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
            "actionDisabled":function () {
                let me = this;
                if(typeof me.item.isDisabled === 'function'){
                    return me.item.isDisabled(me.record,me.store);
                }
            }
        },
        methods:{
            handler:function () {
                let me = this;
                if(me.item.handler && (typeof me.item.handler == "function") ){
                    me.item.handler(me.record);
                }
            }
        },
        components:{

        }
    }
</script>
<style lang="less" scoped>
    .ms-grid-action-item{
        margin: 3px;
        cursor: pointer;
    }
    .ms-grid-action-item-disabled{
        opacity: 0.3;
        cursor: default;
        pointer-events: none;
    }
</style>
