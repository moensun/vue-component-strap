<!--
Created by superBinlin.
Copyright MoenSun
User: superBinlin
Date: 16/5/23
Time: 20:51-->
<template>
    <div>
        <!-- <ms-alert :is-show.sync="alertConfig.show" :message.sync="alertConfig.meaage"></ma-alert> -->
        <ms-pagination :current-page="currentPage" :total="total"></ms-pagination>
    </div>
</template>
<script>
    import {msAlert,msPagination} from "../../src/index";
    export default{
        data(){
            return {
                "alertConfig":{
                    "show":true,
                    "message":"sdsd"
                },
                "currentPage":2,
                "total":20
            }
        },
        components:{
             msPagination,
            msAlert
        }
    }
</script>

