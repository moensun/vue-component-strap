<!--
Created by Bane.Shi.
Copyright MoenSun
User: Bane.Shi
Date: 16/5/7
Time: 00:44-->
<template>
    <td v-show="hidden" :style="[style,columnWidthStyle]">
        <div>
            <a v-if="href" href="{{href}}">{{{ renderer }}}</a>
            <a v-else v-link="link">{{{ renderer }}}</a>
        </div>
    </td>
</template>
<script>
    import GridMixin from "../GridMixin";
    import GridColumnMixin from "./GridColumnMixin";
    export default{
        name:'linkColumn',

        mixins:[GridColumnMixin,GridMixin],
        computed:{
            "link":function () {
                let me = this;
                if(typeof me.setting.link === 'function'){
                    return me.setting.link(me.$get("record."+me.setting.dataIndex),me.record,me.rowIndex);
                }
            },
            "href":function () {
                let me = this;
                if(typeof me.setting.href === 'function'){
                    return me.setting.href(me.$get("record."+me.setting.dataIndex),me.record,me.rowIndex);
                }
            }
        },
        methods:{

        },
        components:{

        }
    }
</script>
<style>

</style>
