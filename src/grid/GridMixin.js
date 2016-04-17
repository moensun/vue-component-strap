/**
 * Created by Bane.Shi.
 * Copyright MoenSun
 * User: Bane.Shi
 * Date: 16/4/12
 * Time: 22:50
 */
'use strict';
export default{
    props:{
        "rowIndex":{},
        "colIndex":{},
        "flexCount":{},
        "surplusWidth":{},
        "setting":{
            type:Object,
            default:function () {
                return {
                    "width":10,
                    "align":"center",
                    "hidden":false
                }
            }
        }
    },
    ready(){
        let me = this;
        me.initStyle();
    },
    watch:{
        'flexCount':function () {
            let me = this;
            me.initStyle();
        },
        'surplusWidth':function () {
            let me = this;
            me.initStyle();
        }
    },
    methods:{
        initStyle:function () {
            let me = this;
            if(me.setting.width){
                me.style = Object.assign({},me.style,{"width":me.setting.width+"px"});
            }
            if(me.setting.align){
                me.style = Object.assign({},me.style,{"textAlign":me.setting.align});
            }
            if(me.setting.flex){
                me.style = Object.assign({},me.style,{"width":( (me.setting.flex/me.flexCount)*me.surplusWidth )+"px"});
            }
        },
    }
}