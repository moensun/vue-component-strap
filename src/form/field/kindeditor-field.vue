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
                    return _.uniqueId("container-");
                }
            },
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
                me.editor = K.create('#'+me.id);
            });
        },
        components:{
        }
    }
</script>
<style>

</style>
