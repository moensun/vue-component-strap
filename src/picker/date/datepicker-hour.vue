<!--
Created by Bane.Shi.
Copyright MoenSun
User: Bane.Shi
Date: 16/5/16
Time: 09:39-->
<template>
    <div class="form-inline">
        <div class="form-group">
            <select class="form-control" v-model="hour">
                <option v-for="(index,item) in hours" track-by="$index" :value="item">
                    {{item | hourFormat}}
                </option>
            </select>
            <label>{{hourText}}</label>
        </div>
    </div>
</template>
<script>
    export default{
        props:{
            "hour":{
                type:Number,
                twoWay:true,
                default:function () {
                    return (new Date()).getHours();
                }
            },
            "hourText":{
                type:String,
                default:function () {
                    return "时";
                }
            }
        },
        computed:{
            "hours":function () {
                let hours = new Array(24);
                for(let i =0;i<24;i++){
                    hours[i] = i;
                }
                return hours;
            }
        },
        filters:{
            "hourFormat":function (hour) {
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