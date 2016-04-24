/**
 * Created by Bane.Shi.
 * Copyright MoenSun
 * User: Bane.Shi
 * Date: 16/4/24
 * Time: 22:03
 */
'use strict';
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
        }
    }
}