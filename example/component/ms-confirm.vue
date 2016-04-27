<!--
Created by Bane.Shi.
Copyright MoenSun
User: Bane.Shi
Date: 16/4/27
Time: 14:36-->
<template>
    <div>
        <div class="panel panel-default">
            <div class="panel-heading">ms-confirm</div>
            <div class="panel-body">
                <div>
                    <button @click="showConfirm()" class="btn btn-default btn-sm">确认</button>
                </div>
                <div class="panel panel-default">
                    <div class="panel-heading">参数说明</div>
                    <div class="panel-body">
                        <div class="table-responsive">
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
                                    <td>isShow</td>
                                    <td>Boolean</td>
                                    <td>是否显示</td>
                                    <td>是</td>
                                    <td>false</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>message</td>
                                    <td>String</td>
                                    <td>信息文本</td>
                                    <td>是</td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>title</td>
                                    <td>String</td>
                                    <td>标题</td>
                                    <td>是</td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>action</td>
                                    <td>Function</td>
                                    <td>回调函数</td>
                                    <td>是</td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="panel panel-default">
                    <div class="panel-heading">代码示例</div>
                    <div class="panel-body">
                        <pre>
 export default{
        data(){
            return {
                "confirmConfig":{
                    "show":false,
                    "message":"",
                    "title":"",
                    "action":null
                }
            }
        },
        methods:{
            "showConfirm":function () {
                let me = this;
                me.confirmConfig.show = true;
                me.confirmConfig.title = "确定";
                me.confirmConfig.message = "确定执行该操作么?";
                me.confirmConfig.action = function (res) {
                    if(res === 'yes'){
                        alert("执行了");
                    }
                }
            }
        },
        components:{
            msConfirm
        }
    }
                        </pre>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <ms-confirm :is-show.sync="confirmConfig.show"
                        :title.sync="confirmConfig.title"
                        :message.sync="confirmConfig.message"
                        :action.sync="confirmConfig.action">
            </ms-confirm>
        </div>
    </div>
</template>
<script>
    import {msConfirm} from "../../src/index";
    export default{
        data(){
            return {
                "confirmConfig":{
                    "show":false,
                    "message":"",
                    "title":"",
                    "action":null
                }
            }
        },
        methods:{
            "showConfirm":function () {
                let me = this;
                me.confirmConfig.show = true;
                me.confirmConfig.title = "确定";
                me.confirmConfig.message = "确定执行该操作么?";
                me.confirmConfig.action = function (res) {
                    if(res === 'yes'){
                        alert("执行了");
                    }
                }
            }
        },
        components:{
            msConfirm
        }
    }
</script>
<style>

</style>
