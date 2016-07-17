<!--
Created by Bane.Shi.
Copyright MoenSun
User: Bane.Shi
Date: 16/7/17
Time: 23:28-->
<template>
<div class="ms-image-select-preview">
    <div class="col-md-10">
        <div class="thumbnail">
            <img :src="imageUrl" @error="errorImage()">
        </div>
    </div>
    <div class="col-md-2">
        <label class="btn btn-default btn-sm">
            {{browseText}}
            <input type="file" @change="onSelectFile($event)" style="display: none;" />
        </label>
        <button type="button" class="btn btn-danger btn-sm" @click="onClearImage()">{{cleanText}}</button>
    </div>
</div>
</template>
<script>
    import imageIndex from "../../images/index";
    export default{
        props:{
            "browseText":{
                default:function () {
                    return "浏览";
                }
            },
            "cleanText":{
                default:function () {
                    return "清除";
                }
            },
            "image":{
                type:String,
                twoWay:true,
                default:function () {
                    return "";
                }
            }
        },
        data(){
            return {

            }
        },
        computed:{
            "imageUrl":function () {
                let me = this;
                return me.image ? me.image : imageIndex.noImage;
            }
        },
        methods:{
            "errorImage":function () {
                return imageIndex.noImage;
            },
            "onSelectFile":function (e) {
                let me = this;
                let files = e.target.files;
                let reader = new FileReader();
                if(files && files.length>0){
                    reader.readAsDataURL(files[0]);
                    reader.onload = function (e) {
                        me.image = e.target.result;
                    }
                }
                e.target.value="";
            },
            "onClearImage":function () {
                let me = this;
                me.image = "";
            },
        },
        components:{
        }
    }
</script>
<style lang="less">
.ms-image-select-preview{
    height: auto!important;
    .thumbnail{
        display: inline-block;
        img{
            max-width: 100%;
        }
    }
}
</style>
