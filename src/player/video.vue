<!--
Created by Bane.Shi.
Copyright MoenSun
User: Bane.Shi
Date: 16/5/15
Time: 17:47-->
<template>
    <div  class="ms-video" :style="[sizeStyle]">
<!--        <video v-el:video-el class="video-js" controls :preload="preload"  style="width: 100%;height: 100%"
               :poster="poster" :dataSetup="options" :src="src">
            <source :src="src" :type="type">
            <p class="vjs-no-js">
                To view this video please enable JavaScript, and consider upgrading to a web browser that
                <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a>
            </p>
        </video>-->
        <video v-el:video-el class="video-js" controls :preload="preload"  style="width: 100%;height: 100%"
               :poster="poster" :dataSetup="options" :src="src">

        </video>
    </div>
</template>
<script>
    import images from "../images/index";
    import "video.js/dist/video-js.css";
    import "video.js/dist/ie8/videojs-ie8";
    import videojs from "video.js";
    export default{
        name:'msVideo',
        props:{
            "preload":{
                type:String,
                default:function () {
                    return "auto";
                }
            },
            "poster":{
                type:String
            },
            "src":{

            },
            "type":{
                type:String
            },
            "options":{
                type:Object,
                default:function () {
                    return {};
                }
            },
            "width":{
                type:Number
            },
            "height":{
                type:Number
            }
        },
        data(){
            return {
                "player":null
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
        watch:{
            'src':{
                handler:function (newValue,oldValue) {
                    let me = this;
                    me.player.src(newValue);
                },
                deep:true
            },
            "preload":function (newValue,oldValue) {
                let me = this;
                me.player.poster(newValue);
            }
        },
        ready(){
            let me = this;
            me.initialize();
        },
        methods:{
            "initialize":function () {
                let me = this;
                me.player = videojs(me.$els.videoEl, me.options, function() {
                    // This is functionally the same as the previous example.
                });
                me.player.src(me.src);
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
