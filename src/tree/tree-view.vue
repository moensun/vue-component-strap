<!--
Created by Bane.Shi.
Copyright MoenSun
User: Bane.Shi
Date: 2016/3/31
Time: 22:04-->
<template>
    <div class="ms-tree-view">
        <button @click="test" type="button">ceshi </button>
        <ul>
            <li v-for="(index,record) in data" v-show="show(record)" @click.prevent="selectValue(index,record,$event)" :class="{'active':( record == selectRecord )}">
                {{{record.spaceHtml}}}
                <i  v-if="isLeaf(record)" class="ms-tree-space"></i>
                <i v-else class="glyphicon ms-tree-grid-action" :class="{'glyphicon-plus':!record.expanded,'glyphicon-minus':record.expanded }" @click.stop="toggle(index,record)"></i>
                {{record[displayField]}}
            </li>
        </ul>
    </div>
</template>
<script>
    import Vue from "vue";
    import TreeViewMixin from "./mixin/TreeViewMixin";
    export default{
        name:'treeView',
        mixins:[TreeViewMixin],
        props:{

        },
        data:function(){
            return {
                tempData:[]
            }
        },
        created:function(){

        },
        ready:function(){
            this.setValue(this.value);
        },
        watch:{
            'text':{
                deep:true,
                handler:function (newVal,oldVal) {
                    console.log("text",newVal);
                }
            }
        },
        methods:{

            test:function(){
                let me = this;
                console.log($(me.$el).position());
                console.log(this.data);

            }
        },
        components:{

        }
    }
</script>
<style lang="less" scoped>
    .ms-tree-view{
        ul{
            list-style-type: none;padding: 0px;margin: 0px;
            li{
                line-height: 22px; cursor: pointer;
                &:hover{background: rgba(136, 200, 255, 0.5);}
                &.active{background: rgba(136, 200, 255, 0.5);}
            }
        }
    }
</style>
