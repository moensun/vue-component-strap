<!--
Created by Bane.Shi.
Copyright MoenSun
User: Bane.Shi
Date: 16/5/15
Time: 17:47-->
<template>
    <div class="ms-video" :style="[sizeStyle]">
        <video id="my-video" class="video-js" controls :preload="preload"  style="width: 100%;height: 100%"
               :poster="poster" data-setup="{}">
            <source :src="src" :type="type">
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
        props:{
            "preload":{
                type:String,
                default:function () {
                    return "auto";
                }
            },
            "poster":{
                type:String,
                default:function () {
                    return "";
                }
            },
            "src":{
                type:String
            },
            "type":{
                type:String
            },
            "width":{
                type:Number
            },
            "height":{
                type:Number
            }
        },
        computed:{
            "sizeStyle":function () {
                let me = this;
                let style= {};
                if(me.width){
                    Object.assign(style,{'width':me.width+'px'});
                }else {
                    Object.assign(style,{'width':'100%'});
                }
                if(me.height){
                    Object.assign(style,{'height':me.height+'px'});
                }else {
                    Object.assign(style,{'height':'100%'});
                }
                return style;
            }
        },
        components:{
        }
    }
</script>
<style lang="less" scoped>
    .ms-video{
        position: relative;
    }
</style>
