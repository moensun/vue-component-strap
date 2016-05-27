<template>
    <td v-show="hidden" :style="[style,columnWidthStyle]" @click="click()">
        <div>{{{ renderer }}}</div>
    </td>
</template>
<script>
    import GridMixin from "../GridMixin";
    import GridColumnMixin from "./GridColumnMixin";
    export default{
        name:'textColumn',

        mixins:[GridColumnMixin,GridMixin],
        methods:{

        },
        components:{

        }
    }
</script>
<style>

</style>
