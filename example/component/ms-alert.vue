<!--
Created by Bane.Shi.
Copyright MoenSun
User: Bane.Shi
Date: 16/4/27
Time: 11:25-->
<template>
<div>
    <div class="panel panel-default">
        <div class="panel-heading">ms-alert</div>
        <div class="panel-body">
            <div>
                <button @click="alert1()" class="btn btn-default btn-sm">alert1</button>
                <button @click="alert2()" class="btn btn-default btn-sm">alert2</button>
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
            "alertConfig":{
                "show":false,
                "message":"",
                "title":""
            }
        }
    },
    methods:{
        "alert1":function () {
            let me = this;
            me.alertConfig.title = "Alert";
            me.alertConfig.show = true;
            me.alertConfig.message = "ALERT1";
        },
        "alert2":function () {
            let me = this;
            // me.alertConfig.title = "Alert";
            me.alertConfig.show = true;
            me.alertConfig.message = "ALERT2";
        }
    },
    components:{
        msAlert
    }
}
                    </pre>
                </div>
            </div>
        </div>
    </div>
    <div>
        <ms-alert :is-show.sync="alertConfig.show"
                  :message.sync="alertConfig.message"
                  :title.sync="alertConfig.title">
        </ms-alert>

    </div>
</div>
</template>
<script>
    import {msAlert} from "../../src/index";
    export default{
        data(){
            return {
                "alertConfig":{
                    "useProgress":false,
                    "show":false,
                    "progress":false,
                    "message":"",
                    "title":""
                }
            }
        },
        methods:{
            "alert1":function () {
                let me = this;
                me.alertConfig.title = "Alert";
                me.alertConfig.show = true;
                me.alertConfig.message = "ALERT1";
            },
            "alert2":function () {
                let me = this;
               // me.alertConfig.title = "Alert";
                me.alertConfig.show = true;
                me.alertConfig.message = "ALERT2";
            }
        },
        components:{
            msAlert
        }
    }
</script>
<style>

</style>
