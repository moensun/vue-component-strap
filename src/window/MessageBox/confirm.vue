<!--
Created by Bane.Shi.
Copyright MoenSun
User: Bane.Shi
Date: 16/4/9
Time: 11:17-->
<template>
    <div v-if="isShow" class="ms-confirm">
        <div class="modal fade bs-example-modal-sm in" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" style="display: block; padding-right: 15px;">
            <div class="modal-dialog modal-sm">
                <div class="modal-content">

                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="close()"><span aria-hidden="true">×</span></button>
                        <h4 class="modal-title" id="mySmallModalLabel">{{title}}</h4>
                    </div>
                    <div class="modal-body">
                        {{{message}}}
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-success" data-dismiss="modal" @click="sure()">{{sureText}}</button>
                        <button type="button" class="btn btn-default" data-dismiss="modal" @click="cancel()">{{cancelText}}</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div>
        <div v-if="(backdrop === 'true')" class="modal-backdrop fade in"></div>
    </div>
</template>
<script>
    import MessageBoxMixin from "./MessageBoxMixin";
    export default{
        name:"confirm",
        mixins:[MessageBoxMixin],
        props:{
            action:{
                type:Function,
                twoWay:true,
            }
        },
        watch:{
            "isShow":function (newValue,oldValue) {
                let me = this;
                if(newValue === false){
                    me.title = "";
                    me.message = "";
                    me.action = null;
                }
            }
        },
        methods:{
            sure:function () {
                let me = this;
                me.isShow = false;
                if(typeof me.action === 'function'){
                    me.action("yes");
                }

            },
            cancel:function () {
                let me = this;
                me.isShow = false;
                if(typeof me.action === 'function'){
                    me.action("cancel");
                }
            }
        },
        components:{
        }
    }
</script>
<style lang="less" scoped>
    .ms-confirm{
        .modal-footer{text-align: center!important;}
    }
</style>