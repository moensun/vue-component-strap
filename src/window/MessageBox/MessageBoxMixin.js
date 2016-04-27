/**
 * Created by Bane.Shi.
 * Copyright MoenSun
 * User: Bane.Shi
 * Date: 16/4/9
 * Time: 11:19
 */
'use strict';
export default{
    props:{
        backdrop:{
            type:String,
            default:function () {
                return "true";
            }
        },
        title:{
            type:String,
            twoWay:true,
            default:function () {
                return "";
            }
        },
        isShow:{
            type:Boolean,
            twoWay:true,
            default:function () {
                return false;
            }
        },
        message:{
            type:String,
            twoWay:true,
            default:function () {
                return "";
            }
        },
        sureText:{
            type:String,
            default:function () {
                return "确定";
            }
        },
        cancelText:{
            type:String,
            default:function () {
                return "取消";
            }
        }
    },
    methods:{
        close:function () {
            this.isShow = false;
        }
    }
}