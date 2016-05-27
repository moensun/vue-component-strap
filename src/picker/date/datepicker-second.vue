<!--
Created by Bane.Shi.
Copyright MoenSun
User: Bane.Shi
Date: 16/5/16
Time: 11:09-->
<template>
    <div class="form-inline">
        <div class="form-group">
            <select class="form-control" v-model="second">
                <option v-for="(index,item) in seconds" track-by="$index" :value="item">
                    {{item | secondFormat}}
                </option>
            </select>
            <label>{{secondText}}</label>
        </div>
    </div>
</template>
<script>
    export default{
        props:{
            "second":{
                type:Number,
                twoWay:true,
                default:function () {
                    return (new Date()).getSeconds();
                }
            },
            "secondText":{
                type:String,
                default:function () {
                    return "秒";
                }
            }
        },
        computed:{
            "seconds":function () {
                let seconds = new Array(60);
                for(let i =0;i<60;i++){
                    seconds[i] = i;
                }
                return seconds;
            }
        },
        filters:{
            "secondFormat":function (hour) {
                if(parseInt(hour)<10){
                    return '0'+hour;
                }else {
                    return hour;
                }
            }
        },
        components:{
        }
    }
</script>
<style lang="less" scoped>

</style>