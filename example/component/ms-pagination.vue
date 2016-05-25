<!--
Created by superBinlin.
Copyright MoenSun
User: superBinlin
Date: 16/5/23
Time: 20:51-->
<template>
    <div class="add-m">
        <ms-pagination :current-page.sync="currentPage" :list-count="listcount" :limit-arr="limitArr"></ms-pagination>
    </div>
    <div>
        <table class="table table-bordered">
            <thead>
            <tr>
                <th>参数</th>
                <th>类型</th>
                <th>释义</th>
                <th>是否双向绑定</th>
                <th>默认值</th>
                <th>补充说明</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>currentPage</td>
                <td>Number</td>
                <td>当前页数</td>
                <td>是</td>
                <td>0</td>
                <td>获取当前页数</td>
            </tr>
            <tr>
                <td>listCount</td>
                <td>Number</td>
                <td>总条数</td>
                <td>否</td>
                <td>0</td>
                <td>获取数据总条数</td>
            </tr>
            <tr>
                <td>limitArr</td>
                <td>Array</td>
                <td>自定义一页展示条数</td>
                <td>否</td>
                <td>[5,10,15]</td>
                <td>下拉框选项,可自定义可选择的限制数</td>
            </tr>
            </tbody>
        </table>
        <p class="red">
            调取接口建议做法,在外部watch:currentpage :)
        </p>
    </div>
</template>
<script>
    import {msAlert,msPagination} from "../../src/index";
    export default{
        data(){
            return {
                "currentPage":1,
                "listcount":40,
                "limitArr":[3,6,9]
            }
        },
        watch:{
            currentPage:function(val,oldval){
                console.log(val,oldval)
            }
        },
        components:{
             msPagination
        }
    }
</script>
<style>
    .add-m{margin-top:20px;}
    .red{color:red}
</style>
