<template>
    <div class="grid-panel">
        <div class="grid-header">
            <table class="table">
                <thead>
                    <tr>
                        <th v-for="(colIndex,column) in columns"
                            is="grid-header"
                            :flex-count="flexCount"
                            :surplus-width="surplusWidth"
                            :setting="column"
                        ></th>
                    </tr>
                </thead>
            </table>
        </div>
        <div class="grid-body">
            <table class="table">
                <tbody>
                    <tr v-for="(rowIndex,record) in store">
                        <td v-for="(colIndex,column) in columns"
                            :is="(column.type?column.type:'text-column' )"
                            :record="record"
                            :flex-count="flexCount"
                            :surplus-width="surplusWidth"
                            :setting="column"
                        ></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="grid-footer">

        </div>
    </div>
</template>
<script>
    import _ from "lodash";
    import gridHeader from "./header/header.vue";
    import textColumn from "./column/text.vue";
    import actionColumn from "./column/action.vue";
    export default{
        name:'gridPanel',
        props:{
            "store":{
                type:Array,
                default:function () {
                    return [];
                }
            },
            "columns":{
                type:Array,
                default:function () {
                    return [];
                }
            }
        },
        data(){
            return {
                "clientWidth":0
            }
        },
        ready(){
            let me = this;
            me.clientWidth = me.$el.clientWidth;
        },
        computed:{
            "flexCount":function () {
                let me = this;
                let flexCount = 0;
                _.forEach(me.columns,function (column) {
                    if(column.flex && !column.width ){
                        flexCount += column.flex;
                    }
                });
                return flexCount;
            },
            "surplusWidth":function () {
                let me = this;
                me.clientWidth = me.$el.clientWidth;
                debugger;
                let widthCount = 0;
                _.forEach(me.columns,function (column) {
                    if(column.width && !column.flex){
                        widthCount += column.width;
                    }
                });
                return me.clientWidth-widthCount;
            }
        },
        methods:{

        },
        components:{
            gridHeader,
            textColumn,
            actionColumn
        }
    }
</script>
<style lang="less" scoped>
    .grid-panel{
        width: 100%;
        position: relative;
        .grid-header{
            .table{margin-bottom: 0px;}
        }
        .grid-body{
            overflow-y: auto;
        }
        .grid-footer{

        }
    }
</style>
