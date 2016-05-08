<!--
Created by Bane.Shi.
Copyright MoenSun
User: Bane.Shi
Date: 16/5/8
Time: 13:42-->
<template>
    <div v-if="isShow">
        <div class="modal fade bs-example-modal-sm in" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" style="display: block; padding-right: 15px;" >
            <slot></slot>
        </div>
        <div v-if="(backdrop === 'true')" class="modal-backdrop fade in"></div>
    </div>
</template>
<script>
    export default{
        props:{
            backdrop:{
                type:String,
                default:function () {
                    return "true";
                }
            },
            isShow:{
                type:Boolean,
                twoWay:true,
                default:function () {
                    return false;
                }
            }
        },
        methods:{
            "onClose":function () {
                this.isShow = false;
            }
        },
        components:{
        }
    }
</script>
<style>

</style>
