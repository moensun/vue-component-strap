<!--
Created by Bane.Shi.
Copyright MoenSun
User: Bane.Shi
Date: 16/4/22
Time: 22:15-->
<template>
    <div>
        <button class="btn btn-default btn-sm" @click="setHeight()">设置表格高度</button>
        <button class="btn btn-default btn-sm" @click="cancelHeight()">取消表格高度</button>
        <button class="btn btn-default btn-sm" @click="showPaging()">显示分页</button>
        <button class="btn btn-default btn-sm" @click="showLoading()">显示加载</button>
        <button class="btn btn-default btn-sm" @click="hideLoading()">隐藏加载</button>
    </div>
    <div>
        <div>
            <ms-grid-panel :store="store"
                           :columns="columns"
                           :height="height"
                           row-lines="true"
                           :paging="paging"
                           :is-loading="isLoading"></ms-grid-panel>
        </div>
    </div>
    <hr>
    <div class="panel panel-default">
        <div class="panel-heading">参数说明</div>
        <div class="panel-body">
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
                    <td>height</td>
                    <td>Number</td>
                    <td>整个列表面版的高度</td>
                    <td>否</td>
                    <td>无</td>
                    <td>如果设置的面板高度,就会去自动计算出中间列表的高度,超出会显示滚动条</td>
                </tr>
                <tr>
                    <td>store</td>
                    <td>Array</td>
                    <td>数据</td>
                    <td>否</td>
                    <td>无</td>
                    <td>返回的数据列表</td>
                </tr>
                <tr>
                    <td>columns</td>
                    <td>Array</td>
                    <td>列配置</td>
                    <td>否</td>
                    <td>无</td>
                    <td>是对每一列的配置</td>
                </tr>
                <tr>
                    <td>currentPage</td>
                    <td>Number</td>
                    <td>当前页码</td>
                    <td>是</td>
                    <td>0</td>
                    <td></td>
                </tr>
                <tr>
                    <td>limit</td>
                    <td>Number</td>
                    <td>每页显示条数</td>
                    <td>是</td>
                    <td>20</td>
                    <td></td>
                </tr>
                <tr>
                    <td>total</td>
                    <td>Number</td>
                    <td>数据总条数</td>
                    <td>是</td>
                    <td>0</td>
                    <td></td>
                </tr>
                <tr>
                    <td>emptyText</td>
                    <td>String</td>
                    <td>空数据文本</td>
                    <td>否</td>
                    <td></td>
                    <td>当数据为空的时候显示的文本</td>
                </tr>
                <tr>
                    <td>paging</td>
                    <td>Object</td>
                    <td>分页控件配置</td>
                    <td>否</td>
                    <td></td>
                    <td>
                        <p>theme:分页控件模板,当前没有其他可用</p>
                        <p>pageText: </p>
                        <p>showText: </p>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div class="panel panel-default">
        <div class="panel-heading">代码示例</div>
        <div class="panel-body">
            <pre>
                "columns":[
                    {
                        type:'text-column',
                        text:'文本',
                        dataIndex:'text',
                        flex:1,
                        listeners:{
                            click:function (val,record) {
                                alert(val);
                            }
                        }
                    },
                    {
                        type:'text-column',
                        text:'名称',
                        dataIndex:'name',
                        flex:2
                    },
                    {
                        type:'action-column',
                        text:'',
                        dataIndex:'id',
                        width:100,
                        items:[
                            {
                                "cls":"glyphicon glyphicon-pencil",
                                handler:function (record) {
                                    alert(record);
                                },
                                isDisabled:function (record) {
                                    if(record.id==4){
                                        return true;
                                    }
                                }
                            }
                        ]
                    }
                ]
            </pre>
        </div>
    </div>
</template>
<script>
    import {msGridPanel} from "../../src/index";
    export default{
        data(){
            return {
                "store":[
                    {"id":"1","text":"第一行","name":"name1"},
                    {"id":"2","text":"第一行","name":"name1"},
                    {"id":"3","text":"第一行","name":"name1"},
                    {"id":"4","text":"第一行","name":"name1"},
                    {"id":"5","text":"第一行","name":"name1"},
                    {"id":"6","text":"第一行","name":"name1"},
                    {"id":"7","text":"第一行","name":"name1"},
                    {"id":"8","text":"第一行","name":"name1"},
                    {"id":"9","text":"第一行","name":"name1"},
                    {"id":"10","text":"第一行","name":"name1"},
                    {"id":"11","text":"第一行","name":"name1"},
                    {"id":"12","text":"第一行","name":"name1"},
                    {"id":"13","text":"第一行","name":"name1"},
                    {"id":"14","text":"第一行","name":"name1"},
                    {"id":"15","text":"第一行","name":"name1"},
                    {"id":"16","text":"第一行","name":"name1"}
                ],
                "columns":[
                    {
                        type:'text-column',
                        text:'文本',
                        dataIndex:'text',
                        flex:1,
                        listeners:{
                            click:function (val,record) {
                                alert(val);
                            }
                        }
                    },
                    {
                        type:'text-column',
                        text:'名称',
                        dataIndex:'name',
                        flex:2
                    },
                    {
                        type:'action-column',
                        text:'',
                        dataIndex:'id',
                        width:100,
                        items:[
                            {
                                "cls":"glyphicon glyphicon-pencil",
                                "tooltip":"编辑",
                                handler:function (record) {
                                    alert(record);
                                },
                                isDisabled:function (record) {
                                    if(record.id==4){
                                        return true;
                                    }
                                }
                            },
                            {
                                "cls":"btn btn-link btn-sm",
                                "text":"测试",
                                "hidden":function (record) {
                                    if(record.id==5){
                                        return true;
                                    }
                                }
                            }
                        ]
                    }
                ],
                "height":200,
                "paging":null,
                "isLoading":false
            }
        },
        methods:{
            "setHeight":function () {
                this.height = 200;
            },
            "cancelHeight":function () {
                this.height = null;
            },
            "showPaging":function () {
                this.paging = {}
            },
            "showLoading":function () {
                this.isLoading = true;
            },
            "hideLoading":function () {
                this.isLoading = false;
            }
        },
        components:{
            msGridPanel
        }
    }
</script>
<style>

</style>
