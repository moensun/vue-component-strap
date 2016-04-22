<!--
Created by Bane.Shi.
Copyright MoenSun
User: Bane.Shi
Date: 16/4/22
Time: 17:11-->
<template>
    <button type="button" class="btn btn-sm btn-default" >
        <span>{{dayItem | dayFormat}}</span>
    </button>
</template>
<script>
    export default{
        name:"datepickerRangeDay",
        props:{
            dayItem:{

            }
        },
        computed:{

        },
        filters:{
            "dayFormat":function (date) {
                date = new Date(date);
                let day  = date.getDate();
                if(day<10){
                    return "0"+day;
                }else {
                    return day;
                }
            }
        },
        components:{
        }
    }
</script>
<style lang="less" scoped>

</style>
