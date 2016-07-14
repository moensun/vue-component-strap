<!--
Created by Bane.Shi.
Copyright MoenSun
User: Bane.Shi
Date: 16/5/8
Time: 13:47-->
<template>
    <div>
        <button @click="showModal()" class="btn btn-default">显示</button>
        <ms-modal :is-show.sync="show">
            <div class="modal-dialog modal-sm">
                <div class="modal-content">

                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="close()"><span aria-hidden="true">×</span></button>
                        <h4 class="modal-title" id="mySmallModalLabel"></h4>
                    </div>
                    <div class="modal-body">

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-dismiss="modal" @click="close()">确定</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </ms-modal>
    </div>
</template>
<script>
    import {msModal} from "../../src/index";
    export default{
        data(){
            return {
                "show":false
            }
        },
        methods:{
            "showModal":function () {
                this.show = true;
            },
            "close":function () {
                this.show = false;
            }
        },
        components: {
            msModal
        }
    }
</script>
<style>

</style>
