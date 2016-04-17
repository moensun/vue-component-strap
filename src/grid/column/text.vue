<template>
    <td v-show="!setting.hidden" :style="[style]">
        <div>{{{ renderer() }}}</div>
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
