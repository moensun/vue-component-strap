<!--
Created by Bane.Shi.
Copyright MoenSun
User: Bane.Shi
Date: 16/6/5
Time: 00:53-->
<template>
    <div v-if="isShow" class="ms-progress">
        <div class="modal fade bs-example-modal-sm in" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" style="display: block; padding-right: 15px;">
            <div class="ms-progress-box">
                <div class="progress ms-progress-inner">
                    <div class="progress-bar progress-bar-striped active" role="progressbar" :aria-valuenow="value" aria-valuemin="0" aria-valuemax="100" :style="style"><span class="sr-only">{{value}}% Complete</span></div>
                </div>
            </div>
        </div>
        <div v-if="backdrop" class="modal-backdrop fade in"></div>
    </div>
</template>
<script>
    import MessageBoxMixin from "./MessageBoxMixin";
    export default{
        name:'progress',
        mixins:[MessageBoxMixin],
        props:{
            "value":{
                type:Number,
                default:function () {
                    return 100;
                }
            }
        },
        computed:{
            "style":function () {
                let me = this;
                return {
                    "width":me.value+"%"
                }
            }
        },
        components:{
        }
    }
</script>
<style lang="less" scoped>
.ms-progress{
    .ms-progress-box{
        position: absolute;
        top:50%;
        width: 100%;
        .ms-progress-inner{
            width: 50%;
            margin-left: auto;
            margin-right: auto;
        }
    }
}
</style>
