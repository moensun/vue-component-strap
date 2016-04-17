<!--
Created by Bane.Shi.
Copyright MoenSun
User: Bane.Shi
Date: 16/4/9
Time: 10:44-->
<template>
    <div v-if="isShow" >
        <div class="modal fade bs-example-modal-sm in" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" style="display: block; padding-right: 15px;">
            <div class="modal-dialog modal-sm">
                <div class="modal-content">

                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                        <h4 class="modal-title" id="mySmallModalLabel">{{title}}</h4>
                    </div>
                    <div class="modal-body">
                        {{message}}
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">{{sureText}}</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div>
        <div v-if="(backdrop === 'true')" class="modal-backdrop fade in"></div>
    </div>
</template>
<script>
    export default{
        name:"message-box",
        props:{
            backdrop:{
                type:String,
                default:function () {
                    return "true";
                }
            },
            title:{
                type:String,
                default:function () {
                    return "";
                }
            },
            isShow:{
                type:Boolean,
                twoWay:true,
                default:function () {
                    return false;
                }
            },
            message:{
                type:String,
                default:function () {
                    return "";
                }
            },
            sureText:{
                type:String,
                default:function () {
                    return "确定";
                }
            }
        },
        components:{
        }
    }
</script>
<style>

</style>
