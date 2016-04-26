/**
 * Created by Bane.Shi.
 * Copyright MoenSun
 * User: Bane.Shi
 * Date: 16/4/9
 * Time: 08:22
 */
'use strict';
export default{
    props:{
        "store":{
            type:Array
        },
        "record":{
            type:Object
        },
    },
    data(){
        return {

        }
    },
    ready(){
        
    },
    computed:{
        "style":function () {
            let me = this;
            let style = {};
            if(me.setting.align){
                style = Object.assign(style,{"textAlign":me.setting.align});
            }
            return style;
        },
        "renderer":function () {
            let me = this;
            if(typeof me.setting.renderer == "function"){
                return me.setting.renderer(me.$get("record."+me.setting.dataIndex),me.record,me.rowIndex);
            }else{
                return me.$get("record."+me.setting.dataIndex);
            }
        }
    },
    methods:{
        "click":function () {
            let me = this;
            if(me.setting.listeners && me.setting.listeners.click && (typeof me.setting.listeners.click == 'function')){
                me.setting.listeners.click(me.$get("record."+me.setting.dataIndex),me.record);
            }
        }
    }
}