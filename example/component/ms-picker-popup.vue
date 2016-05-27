<template>
    <group title="选择性别">
        <picker-popup :title="title1" :data="list1" :value.sync="value1"></picker-popup>
    </group>
    <small>data:<br>[['男','女']]</small>

    <group title="选择班级">
        <picker-popup :title="title2" :data="list2" :value.sync="value2"></picker-popup>
    </group>
    <small>data:<br>[<br>
        ['初一','初二','初三],<br>
        ['一班','二班','三班','四班','五班','六班']<br>
        ]</small>

    <group title="选择省市">
        <picker-popup :title="title3" :data="list3" :value.sync="value3" :columns="2" show-name></picker-popup>
    </group>
    <small>data:[{<br>
        name:'江苏',<br>
        value:'jiangsu',<br>
        parent:0<br>
        },<br>
        {<br>
        name:'山东',<br>
        value:'shandong',<br>
        parent:0<br>
        },<br>
        {<br>
        name:'广东',<br>
        value:'guangdong',<br>
        parent:0<br>
        },<br>
        {<br>
        name:'苏州',<br>
        value:'suzhou',<br>
        parent:'jiangsu'<br>
        },<br>
        {<br>
        name:'南京',<br>
        value:'nanjing',<br>
        parent:'jiangsu',<br>
        },<br>
        {<br>
        name:'青岛',<br>
        value:'qingdao',<br>
        parent:'shandong'<br>
        },<br>
        {<br>
        name:'烟台',<br>
        value:'yantai',<br>
        parent:'shandong'<br>
        },<br>
        {<br>
        name:'广州',<br>
        value:'guangzhou',<br>
        parent:'guangdong'<br>
        },<br>
        {<br>
        name:'深圳',<br>
        value:'shenzheng',<br>
        parent:'guangdong'<br>
        }]<br></small>

    <group title="选择日期">
        <date-time :value.sync="datavalue" @on-change="change" title="选择日期"></date-time>
    </group>

    <div>
        <h2>pickerPopup</h2>
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
            <tr>
                <td>title</td>
                <td>String</td>
                <td>选项名称</td>
                <td>否</td>
                <td>无</td>
                <td></td>
            </tr>
            <tr>
                <td>data</td>
                <td><b>Array</b></td>
                <td>待选项</td>
                <td>否</td>
                <td>[]</td>
                <td>详见demo 可实现联动</td>
            </tr>
            <tr>
                <td>value</td>
                <td><b>Array</b></td>
                <td>默认值/选中值</td>
                <td>是</td>
                <td>[]</td>
                <td></td>
            </tr>
            <tr>
                <td>columns</td>
                <td>Number</td>
                <td>[Object]形式时需要设置</td>
                <td>否</td>
                <td>0</td>
                <td></td>
            </tr>
        </table>

    </div>
</template>
<script>
    import {pickerPopup,group,dateTime} from "../../src/index";
    export default{
        data(){
            return{
                title1: '选择性别',
                title2:'选择班级',
                title3:'选择省市',
                list1:[['男','女']],
                list2:[['初一','初二','初三'],['一班','二班','三班','四班','五班','六班']],
                list3:[{
                        name:'江苏',
                        value:'jiangsu',
                        parent:0
                    },
                    {
                        name:'山东',
                        value:'shandong',
                        parent:0
                    },
                    {
                        name:'广东',
                        value:'guangdong',
                        parent:0
                    },
                    {
                        name:'苏州',
                        value:'suzhou',
                        parent:'jiangsu'
                    },
                    {
                        name:'南京',
                        value:'nanjing',
                        parent:'jiangsu',
                    },
                    {
                        name:'青岛',
                        value:'qingdao',
                        parent:'shandong'
                    },
                    {
                        name:'烟台',
                        value:'yantai',
                        parent:'shandong'
                    },
                    {
                        name:'广州',
                        value:'guangzhou',
                        parent:'guangdong'
                    },
                    {
                        name:'深圳',
                        value:'shenzheng',
                        parent:'guangdong'
                    }],
                value1:['男'],
                value2:[['初一'],['三班']],
                value3:[],
                title:'选择日期',
                datavalue:''
            }
        },
        methods: {
            change: function (value) {
                console.log('change', value)
            }
        },
        components:{
            pickerPopup,
            dateTime,
            group,
        }
    }
</script>