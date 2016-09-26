<!--
Created by Bane.Shi.
Copyright MoenSun
User: Bane.Shi
Date: 16/7/23
Time: 14:51-->
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
                    return _.uniqueId("kinder-editor-");
                }
            },
            "value":{
                twoWay:true,
                type:String,
                default:function () {
                    return "";
                }
            },
            "options":{
                type:Object,
                default:function () {
                    return {};
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

            KindEditor.ready(function(K) {
                me.editor = K.create('#'+me.id,Object.assign({
                    uploadJson:'mslaravel-kindeditor',
                    afterChange:function(){
                        me.value = this.html();
                    }
                },me.options));
            });
        },
        watch:{
            "value":{
                handler:function (newValue,oldValue) {
                    let me = this;
                    if(newValue != me.editor.html()){
                        me.editor.html(newValue);
                    }
                }
            }
        },
        components:{
        }
    }
</script>
<style>

</style>
