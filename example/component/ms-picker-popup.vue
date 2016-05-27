<template>
    <group title="选择性别">
        <picker-popup :title="title1" :data="list1" :value.sync="value1"></picker-popup>
    </group>

    <group title="选择日期">
        <date-time :value.sync="datavalue" @on-change="change" title="选择日期"></date-time>
    </group>
</template>
<script>
    import {pickerPopup,group,dateTime} from "../../src/index";
    export default{
        data(){
            return{
                title1: '选择性别',
                list1:[['男','女']],
                value1:['男'],
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