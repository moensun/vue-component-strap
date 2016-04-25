<!--
Created by Bane.Shi.
Copyright MoenSun
User: Bane.Shi
Date: 2016/3/31
Time: 22:21-->
<template>
    <section class="ms-tree-combox">
        <div class="input-group" tabindex="1" >
            <input type="hidden" v-model="value">
            <input v-el:tree-combox-Text type="text" class="form-control ms-combox-text"  placeholder="{{placeholder}}" @blur="hide" v-model="text"  readonly >
            <div class="input-group-addon ms-combox-icon"><i class="glyphicon glyphicon-triangle-bottom" @click.prevent ="toggleDropdown($event)" @mouseout.prevent="enableBlur" @mouseover.prevent="disableBlur"></i></div>
        </div>
        <div v-show="listShow" class="ms-tree-list" :style="[listBoxStyle]" @mouseout.prevent="enableBlur" @mouseover.prevent="disableBlur" >
            <div class="ms-tree-list-inner" :style="{ width:listWidth}">
                <tree-view :box-show.sync="listShow" :data="data" :value.sync="value" :text.sync="text" :select-type="selectType" :value-field="valueField" :display-field="displayField" v-ref:tree-view></tree-view>
            </div>
        </div>
    </section>
</template>
<script>
    import Vue from "vue";
    import treeView from "../../tree/tree-view.vue";
    export default{
        name:'treeCombox',
        replace:false,
        props:{
            "data":{
                type:Array,
                default:function(){
                    return [];
                }
            },
            "placeholder":{
                type:String,
                default:function(){
                    return "";
                }
            },
            "valueField":{
                type:String,
                default:function () {
                    return "id";
                }
            },
            "displayField":{
                type:String,
                default:function(){
                    return "text";
                }
            },
            "selectType":{
                type:String,
                default:function(){
                    return "Leaf";
                }
            },
            "value":{
                twoWay: true
            },
            "text":{
                twoWay: true
            }
        },
        ready:function(){
            let me = this;
            let o = $(me.$el);
        },
        data:function(){
            return {
                "useBlur":true,
                "listWidth":"inherit",
                "listShow":false,
                "listBoxStyle":{
                    "maxWidth":"inherit",
                    "bottom":"inherit"
                }
            }
        },
        watch:{
            'data':{
                //immediate: true,
                handler: function (newValue, oldVal){
                    if(newValue){
                        let treeView = this.$refs.treeView;
                        treeView.initData();
                    }
                }
            },
            'text':{
                handler:function (newValue, oldVal) {
                    console.log(newValue)
                }
            }
        },
        methods:{
            enableBlur:function(){
                this.$els.treeComboxText.focus();
                this.useBlur=true;
            },
            disableBlur:function(){
                this.useBlur=false;
            },
            toggleDropdown:function(e){
                console.log(this.text);
                let me = this;
                if(!me.listShow){
                    let el = me.$el;
                    me.listWidth = el.clientWidth+"px";
                    me.listBoxStyle.maxWidth = el.clientWidth+"px";

                    let windowHeight = document.documentElement.clientHeight;
                    let toTop = e.y;
                    let toBottom = windowHeight- e.y;
                    if(toBottom<300){
                        me.listBoxStyle.bottom = el.clientHeight+"px";
                    }else {
                        me.listBoxStyle.bottom = "inherit";
                    }
                }
                me.listShow = !me.listShow;
                me.$els.treeComboxText.focus();

            },
            select:function(){
                alert("ss");
            },
            hide:function(){
                if(this.useBlur){
                    this.listShow = false;
                }
            }
        },
        components:{
            treeView
        }
    }
</script>
<style lang="less" scoped>
    .ms-tree-combox{
        .ms-combox-text{
            border-right: 0px;border-top-left-radius: 4px!important;border-bottom-left-radius: 4px!important;
            &[readonly]{background: white;}
        }
        .ms-combox-icon{
            background: white;border-left: 0px;
            i{cursor: pointer;}
        }
        .ms-tree-list{
            position: absolute;z-index: 100;box-sizing: border-box;
            .ms-tree-list-inner{background: white;max-height: 300px;overflow-y: auto;overflow-x: hidden;border: 1px #C7C7C7 solid;}
        }
    }
</style>
