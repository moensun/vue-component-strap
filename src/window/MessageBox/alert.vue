<!--
Created by Bane.Shi.
Copyright MoenSun
User: Bane.Shi
Date: 16/4/9
Time: 10:44-->
<template>
    <div v-if="isShow" class="ms-alert">
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
                        <button type="button" class="btn btn-primary" data-dismiss="modal" @click="sure()">{{sureText}}</button>
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
        name:"alert",
        mixins:[MessageBoxMixin],
        props:{

        },
        watch:{
            "isShow":function (newValue,oldValue) {
                let me = this;
                if(newValue === false){
                    me.title = "";
                    me.message = "";
                }
            }
        },
        methods:{
            sure:function () {
                this.isShow = false;
            }
        },
        components:{
        }
    }
</script>
<style lang="less" scoped>
    .ms-alert{
        .modal-footer{text-align: center!important;}
    }
</style>
