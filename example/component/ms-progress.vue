<!--
Created by Bane.Shi.
Copyright MoenSun
User: Bane.Shi
Date: 16/6/5
Time: 00:54-->
<template>
<div>
    <div class="panel panel-default">
        <div class="panel-heading">ms-progress</div>
        <div class="panel-body">
            <div>
                <button @click="showProgress()">弹出</button>
            </div>
        </div>
    </div>
    <div>
        <ms-progress :is-show.sync="progress.show"></ms-progress>
    </div>
</div>
</template>
<script>
    import {msProgress} from "../../src/index";
    export default{
        data(){
            return {
                "progress":{
                    "show":false
                }
            }
        },
        methods:{
            "showProgress":function () {
                let me = this;
                me.progress.show = true;
            }
        },
        components:{
            msProgress
        }
    }
</script>
<style>

</style>
