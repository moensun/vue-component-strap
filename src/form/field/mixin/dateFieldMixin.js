/**
 * Created by Bane.Shi.
 * Copyright MoenSun
 * User: Bane.Shi
 * Date: 16/4/24
 * Time: 22:03
 */
'use strict';
import _ from "lodash";
export default {
    props:{
        "todayText":{
            type:String,
            default:function () {
                return "今天";
            }
        },
        "cleanText":{
            type:String,
            default:function () {
                return "清空";
            }
        },
        "closeText":{
            type:String,
            default:function () {
                return "关闭";
            }
        },
        "isDisabled":{
            type:Function
        }
    },
    data(){
        return {
            "eventNamespace":null
        }
    },
    ready(){
        let me = this;
        me.$el.id= _.uniqueId("date_field_");
    },
    beforeDestroy() {
        let me = this;
        $(document).off('click'+me.eventNamespace);
    }
}