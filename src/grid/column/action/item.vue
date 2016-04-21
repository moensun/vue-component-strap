<!--
Created by Bane.Shi.
Copyright MoenSun
User: Bane.Shi
Date: 16/4/9
Time: 16:13-->
<template>
    <div role="button" class="ms-grid-action-item" :class="item.cls" @click="handler"></div>
</template>
<script>
    import Vue from "vue";
    export default{
        props:{
            "store":{},
            "item":{
                type:Object,
                default:function () {
                    return {};
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
            me.isDisabled();
        },
        methods:{
            isDisabled:function () {
                let me = this;
                if(typeof me.item.isDisabled === 'function'){
                    let disabled = me.item.isDisabled(me.store,me.record);
                    if(disabled){
                        Vue.util.addClass(me.$el,"ms-grid-action-item-disabled");
                    }else {
                        Vue.util.removeClass(me.$el,"ms-grid-action-item-disabled");
                    }
                }

            },
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
