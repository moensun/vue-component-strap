<!--
Created by Bane.Shi.
Copyright MoenSun
User: Bane.Shi
Date: 16/4/22
Time: 12:42-->
<template>
<div>
    <div>{{value1}}</div>
    <div>
        <ms-date-field :value.sync="value1"></ms-date-field>
    </div>
    <div>
        <div style="max-height: 100px;overflow-y: auto">
            <div v-for="(dateIndex,date) in value2" track-by="$index">{{date}}</div>
        </div>
    </div>
    <div>
        <ms-date-field :multiple=true :is-focus=true :value.sync="value2"></ms-date-field>
    </div>
</div>
</template>
<script>

    import {msDateField} from "../../src/index";
   // import {msDateField} from "../../dist/main";
    export default{
        data(){
            return {
                "value1":"",
                "value2":[]
            }
        },
        components:{

            msDateField
        }
    }
</script>
<style>

</style>
