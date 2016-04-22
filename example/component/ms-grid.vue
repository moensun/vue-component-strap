<!--
Created by Bane.Shi.
Copyright MoenSun
User: Bane.Shi
Date: 16/4/22
Time: 22:15-->
<template>
<div>
    <div>
        <ms-grid-panel :store="store" :columns="columns"></ms-grid-panel>
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
                    },
                    {
                        type:'text-column',
                        text:'名称',
                        dataIndex:'name',
                        flex:2
                    }
                ]
            }
        },
        components:{
            msGridPanel
        }
    }
</script>
<style>

</style>
