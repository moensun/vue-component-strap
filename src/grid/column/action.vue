<!--
Created by Bane.Shi.
Copyright MoenSun
User: Bane.Shi
Date: 16/4/9
Time: 16:05-->
<template>
    <td v-show="!setting.hidden" :style="[style]">
        <div>
            <action-item v-for="(index,item) in setting.items"
                         :item="item"
                         :store="store"
                         :record="record">

            </action-item>
        </div>
    </td>
</template>
<script>
    import GridMixin from "../GridMixin";
    import GridColumnMixin from "./GridColumnMixin";
    import actionItem from "./action/item.vue";
    export default{
        name:"actionColumn",
        mixins:[GridColumnMixin,GridMixin],
        props:{

        },
        data(){
            return{
                
            }
        },
        components:{
            actionItem
        }
    }
</script>
<style>

</style>
