<!--
Created by Bane.Shi.
Copyright MoenSun
User: Bane.Shi
Date: 16/5/15
Time: 16:18-->
<template>
<div>
    <ms-video :poster="poster" :src="src" :height=300></ms-video>
</div>
</template>
<script>
    //import {msVideo} from "../../src/index";
    import {msVideo} from "../../dist/main";
    export default{
        data(){
            return {
                "poster":"http://moensun.oss-cn-qingdao.aliyuncs.com/webtest/ueditor/php/upload/image/20160504/1462380286242516.jpg",
                "src":"http://moensun.oss-cn-qingdao.aliyuncs.com/webtest/ueditor/php/upload/video/20160515/1463292225470615.mp4"
            }
        },
        components:{
            msVideo
        }
    }
</script>
<style>

</style>
