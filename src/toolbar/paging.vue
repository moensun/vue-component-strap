<!--
Created by Bane.Shi.
Copyright MoenSun
User: Bane.Shi
Date: 16/4/22
Time: 23:55-->
<template>
    <div class="ms-paging">
        <div class="ms-paging-left">
            <span class="glyphicon glyphicon-step-backward"></span>
            <span class="tbspacer"></span>
            <span class="glyphicon glyphicon-chevron-left"></span>
            <span class="tbspacer"></span>
            <span class="tbseparator"></span>
            <span>Page</span>
            <input type="text" class="ms-paging-num">
            <span class="tbseparator"></span>
            <span class="tbspacer"></span>
            <span class="glyphicon glyphicon-chevron-right"></span>
            <span class="tbspacer"></span>
            <span class="glyphicon glyphicon-step-forward"></span>
            <span class="tbspacer"></span>
            <span class="tbseparator"></span>
            <span class="glyphicon glyphicon-refresh"></span>
        </div>
    </div>
</template>
<script>
    export default{
        components:{
        }
    }
</script>
<style lang="less" scoped>
    .ms-paging{
        line-height: 34px;
        font-size: 18px;
        .tbspacer{
            width: 5px;
            display: inline-block;
        }
        .tbseparator{
            display: inline-block;
            height: 18px;
            border-left: 1px #989898 solid;
            vertical-align: middle;
        }
        .ms-paging-num{
            width: 40px;
            height: 30px;
            vertical-align: middle;
            line-height: 30px;
            font-size: 14px;
            padding-left: 5px;
        }
        .ms-paging-left{
            display: inline-block;
        }
    }
</style>
