<!--
Created by Bane.Shi.
Copyright MoenSun
User: Bane.Shi
Date: 16/4/19
Time: 19:36-->
<template>
    <ul :class="{'tree-panel-first-level':(level=='1'),'tree-panel':(level!='1')}">
        <li v-for="(index,item) in store">
            <div class="checkbox ms-tree-panel-checkbox">
                <label>
                    <input type="checkbox"
                           v-model="value"
                           value="{{item[id]}}"
                           v-if="showCheckbox">
                    {{item[text]}}
                </label>
            </div>
            <tree-panel :store="item.children"
                        v-if="item.children"
                        :id="id"
                        :text="text"
                        :value.sync="value"
                        level="2"
                        :sel-type="selType">
            </tree-panel>
        </li>
    </ul>
</template>
<script>
    export default{
        name:'treePanel',
        props:{
            "id":{
                type:String,
                default:function () {
                    return "id";
                }
            },
            "text":{
                type:String,
                default:function () {
                    return 'text';
                }
            },
            "level":{
                type:String,
                default:function () {
                    return "1";
                }
            },
            "selType":{
                type:String
            },
            "store":{
                type:Array,
                default:function () {
                    return [];
                }
            },
            "value":{
                type:Array,
                twoWay:true,
                default:function () {
                    return [];
                }
            }
        },
        computed:{
            "showCheckbox":function () {
                let me = this;
                return me.selType == "checkboxmodel";
            }
        },
        data(){
            return{

            }
        },
        components:{

        }
    }
</script>
<style lang="less" scoped>
    ul{
        list-style-type: none;
        margin: 0;
        padding: 0;
        line-height: 22px;
        word-wrap: break-word;
        &.tree-panel-first-level{

        }
        &.tree-panel{
             margin-left:18px;
         }
         li{
            div{
                &.ms-tree-panel-checkbox{
                     margin-top: 0px!important;
                     margin-bottom: 0px!important;
                     padding-top: 0px!important;
                 }

                label{
                    cursor: pointer;
                    vertical-align: middle;
                    input[type=checkbox]{
                        width: 16px;
                        height: 16px;
                        vertical-align: middle;
                    }
                }
            }

         }
    }
</style>
