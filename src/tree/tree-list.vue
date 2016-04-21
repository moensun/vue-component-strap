<!--
Created by Bane.Shi.
Copyright MoenSun
User: Bane.Shi
Date: 16/3/31
Time: 23:40-->
<template>
    <ul :class="{'ms-tree-list':(level===1) ,'ms-tree-menu':!(level===1) }" >
        <li v-for="(index,item) in items">
            <a :class="{'ms-open':item[expanded]}" v-link="item[router]" @click="toggle(index,item)">
                {{item[text]}}
                <i v-if="item[children]" class="glyphicon" :class="{'glyphicon-menu-right':!item[expanded] ,'glyphicon-menu-down':item[expanded] }"></i>
            </a>
            <tree-list :items="item[children]" v-if="item[children]" v-show="item[expanded]" level="2" ></tree-list>
        </li>

    </ul>
</template>
<script>
    import Vue from 'vue';
    export default{
        name:'treeList',
        props:{
            items:{
                type:Array,
                default:function(){
                    return [];
                }
            },
            text:{
                type:String,
                default:function(){
                    return "text";
                }
            },
            children:{
                type:String,
                default:function(){
                    return "children";
                }
            },
            router:{
                type:String,
                default:function(){
                    return "path";
                }
            },
            expanded:{
                type:String,
                default:function(){
                    return "expanded";
                }
            },
            level:{
                coerce:function(val){
                    return parseInt(val?val:1);
                },
                default:function(){
                    return 1;
                }
            }
        },
        data(){
            return{
                
            }
        },
        methods:{
            toggle:function(index,item){
                var me = this;
                if( item[me.children] && item[me.children].length>0 ){
                    if( (typeof item[me.expanded]) == "undefined" ){
                        Vue.set(this.items[index],'expanded',true);
                    }else {
                        item[me.expanded] = !item[me.expanded];
                    }
                }

            }
        },
        components:{

        }
    }
</script>
<style lang="less" scoped>
    ul{
     &.ms-tree-list{
          color: white;list-style-type: none;padding: 0px;margin: 0px;
          &>li {
                position: relative;
                &>a{
                      position: relative;color: #b8c7ce; width: 100%;display: block;  line-height: 40px;  padding: 0px 10px;border-left: 3px solid transparent;text-decoration: none;cursor: pointer;
                    &:hover{color: #fff;  background: #1e282c;  border-left-color: #3c8dbc;}
                    &.ms-open{color: #fff;  background: #1e282c;  border-left-color: #3c8dbc;}
                    &>i{position: absolute;right: 10px;top:12px;}
                  }
            }
      }
    &.ms-tree-menu{
         color: white;list-style-type: none;padding: 0px;margin: 0px;background: #2C3B41;
        &>li {
              position: relative;
              &>a{
                    position: relative;color: #555d5e; width: 100%;display: block;  line-height: 30px;  padding: 0px 10px;border-left: 3px solid transparent;text-decoration: none; cursor: pointer;
                    &:hover{color: white;}
                }
          }
     }
    }
</style>
