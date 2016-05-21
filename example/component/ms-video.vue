<!--
Created by Bane.Shi.
Copyright MoenSun
User: Bane.Shi
Date: 16/5/15
Time: 16:18-->
<template>
<div>
    <ms-video :poster="poster" :src="src" :height=300></ms-video>

    <button type="button" @click="set()">设置视频</button>
    <button type="button" @click="set2()">设置视频</button>
</div>
</template>
<script>
    import {msVideo} from "../../src/index";
    //import {msVideo} from "../../dist/main";
    export default{
        data(){
            return {
                //"poster":"http://moensun.oss-cn-qingdao.aliyuncs.com/webtest/ueditor/php/upload/image/20160504/1462380286242516.jpg",
                "poster":null,
                "src":"http://moensun.oss-cn-qingdao.aliyuncs.com/webtest/ueditor/php/upload/video/20160515/1463292225470615.mp4"
            }
        },
        ready(){

        },
        methods:{
            "set":function () {
                this.src = "http://moensun.oss-cn-qingdao.aliyuncs.com/webtest/2494-%E8%94%A1%E7%90%B4-%E6%9C%80%E5%90%8E%E4%B8%80%E5%A4%9C%5B68mtv.com%5D.mp4";
            },
            "set2":function () {
                this.src="http://moensun.oss-cn-qingdao.aliyuncs.com/webtest/ueditor/php/upload/video/20160515/1463292225470615.mp4"
            }
        },
        components:{
            msVideo
        }
    }
</script>
<style>

</style>
