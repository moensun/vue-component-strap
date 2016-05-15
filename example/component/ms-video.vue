<!--
Created by Bane.Shi.
Copyright MoenSun
User: Bane.Shi
Date: 16/5/15
Time: 16:18-->
<template>
<div>
    <video id="my-video" class="video-js" controls preload="auto" width="640" height="264"
           poster="MY_VIDEO_POSTER.jpg" data-setup="{}">
        <source src="http://moensun.oss-cn-qingdao.aliyuncs.com/webtest/ueditor/php/upload/video/20160515/1463292225470615.mp4" type='video/mp4'>
        <p class="vjs-no-js">
            To view this video please enable JavaScript, and consider upgrading to a web browser that
            <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a>
        </p>
    </video>
</div>
</template>
<script>
    import "video.js/dist/video-js.min.css";
    import "video.js/dist/ie8/videojs-ie8.min";
    import "video.js/dist/video.min";
    export default{
        components:{
        }
    }
</script>
<style>

</style>
