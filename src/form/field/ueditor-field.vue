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
    import _ from "lodash";
    export default{
        props:{
            "id":{
                type:String,
                default:function () {
                    // return "container";
                    return _.uniqueId("container-");
                }
            },
            "height":{
                type:Number
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
                "editor":null,
                "editorReady":false
            }
        },
        ready(){
            let me = this;
            me.editor = UE.getEditor(me.id);
            me.editor.ready(function () {
                me.editorReady = true;
                if(me.height){
                    me.editor.setHeight(me.height);
                }
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

            let editor = UE.getEditor(me.id);
            if( editor && me.editorReady ){
                editor.destroy();
            }
        },
        components:{

        }
    }
</script>
<style>

</style>
