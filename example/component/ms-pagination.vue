<!--
Created by superBinlin.
Copyright MoenSun
User: superBinlin
Date: 16/5/23
Time: 20:51-->
<template>
    <div>
        <!-- <ms-alert :is-show.sync="alertConfig.show" :message.sync="alertConfig.meaage"></ma-alert> -->
        <ms-paginations :current-page="currentPage"></ms-paginations>
    </div>
</template>
<script>
    import {msAlert} from "../../src/index";
    import msPaginations from "../../src/toolbar/pagination.vue";
    export default{
        data(){
            return {
                "alertConfig":{
                    "show":true,
                    "message":"sdsd"
                },
                "currentPage":2
            }
        },
        components:{
             msPaginations,
            msAlert
        }
    }
</script>

