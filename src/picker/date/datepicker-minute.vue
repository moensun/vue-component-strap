<!--
Created by Bane.Shi.
Copyright MoenSun
User: Bane.Shi
Date: 16/5/16
Time: 10:54-->
<template>
    <div class="form-inline">
        <div class="form-group">
            <select class="form-control" v-model="minute">
                <option v-for="(index,item) in minutes" track-by="$index" :value="item">
                    {{item | minuteFormat}}
                </option>
            </select>
            <label>{{minuteText}}</label>
        </div>
    </div>
</template>
<script>
    export default{
        props:{
            "minute":{
                type:Number,
                twoWay:true,
                default:function () {
                    return (new Date()).getMinutes();
                }
            },
            "minuteText":{
                type:String,
                default:function () {
                    return "分";
                }
            }
        },
        computed:{
            "minutes":function () {
                let minutes = new Array(60);
                for(let i =0;i<60;i++){
                    minutes[i] = i;
                }
                return minutes;
            }
        },
        filters:{
            "minuteFormat":function (hour) {
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