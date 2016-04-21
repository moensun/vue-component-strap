<!--
Created by Bane.Shi.
Copyright MoenSun
User: Bane.Shi
Date: 16/4/19
Time: 00:03-->
<template>
    <textarea id="{{id}}"></textarea>
</template>
<script>
    export default{
        props:{
            "id":{
                type:String,
                default:function () {
                    return "container";
                }
            },
            "value":{
                twoWay:true,
                type:String,
                default:function () {
                    return "";
                }
            }
        },
        data(){
            return{
                "editor":null
            }
        },
        ready(){
            let me = this;
            me.editor = UE.getEditor(me.id);
            me.editor.ready(function () {
                me.editor.addListener('contentChange',function () {
                    me.value = me.editor.getContent();
                });
            });
        },
        watch:{
            "value":{
                handler:function (newValue,oldValue) {
                    let me = this;
                    if(newValue != me.editor.getContent()){
                        me.editor.setContent(newValue);
                    }
                }
            }
        },
        destroyed:function () {
            let me = this;
            me.editor.destroy();
        },
        components:{

        }
    }
</script>
<style>

</style>
