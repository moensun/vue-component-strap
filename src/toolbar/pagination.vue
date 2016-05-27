<template>
    <div class="row">
        <div class="col-xs-4 set-middle">
            显示 {{showObj.startlist}} 到 {{showObj.endlist}} 共 {{listCount}} 条
            <select v-model="limitNum">
                <option v-for="limit in limitArr">{{limit}}</option>
            </select>
        </div>
        <div class="col-xs-8">
            <div class="dataTables_paginate paging_bootstrap pagination trade-page">
                <ul>
                    <li class="prev" :class="{'disabled':currentPage == 1}" @click="pagePrev" v-if="currentPage != 0">
                        <a>
                            ← <span class="hidden-480">Previous</span>
                        </a>
                    </li>
                    <li v-for="n in pageObj.leftpage" @click="changePg(n)" :class="{'active':n == currentPage}">
                        <a>{{n}}</a>
                    </li>
                    <!--1...567-->
                    <li v-show="frontshow">
                        <a>...</a>
                    </li>
                    <li v-for="n in pageObj.middlepage" @click="changePg(n)" :class="{'active':n == currentPage}">
                        <a>{{n}}</a>
                    </li>
                    <li v-show="allpage > 10"><a>...</a></li>
                    <li v-for="n in pageObj.rightpage" @click="changePg(n)" :class="{'active':n == currentPage}">
                        <a>{{n}}</a>
                    </li>
                    <li class="next" :class="{'disabled':currentPage == allpage}" @click="pageNext"
                        v-if="currentPage != 0">
                        <a>
                            <span class="hidden-480">Next</span> →
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        ready(){
            this.pageObj = this.pageComput(this.currentPage,this.allpage);
            this.showObj = this.currentShowPage(this.currentPage,this.listCound,this.limitNum);
        },
        props: {
            "currentPage": {
                type: Number,
                default: 0,
                twoway: true
            },
            "listCount": {
                type: Number,
                default: 0,
            },
            "limitArr": {
                type: Array,
                default: [5, 10, 15],
            }
        },
        data(){
            return {
                limitNum:this.limitArr[0],//获取当前用户选择的一页展示数
                pageObj:{
                    type:Object,
                    default:function(){
                        return {
                            'leftpage':[],
                            'middlepage':[],
                            'rightpage':[]
                        }
                    }
                },
                showObj:{
                    type:Object,
                    default:function(){
                        return {
                            'startlist':'',
                            'endlist':''
                        }
                    }
                }
            }
        },
        computed:{
            allpage:function(){
                return Math.ceil(this.listCount / this.limitNum)
            },
            frontshow:function(){
                var pageObj = this.pageObj;
                if(pageObj.leftpage && pageObj.middlepage && pageObj.rightpage){
                    console.log(pageObj.leftpage.length != 0 && pageObj.middlepage.length != 0 && pageObj.rightpage.length != 0)
                    return pageObj.leftpage.length != 0 && pageObj.middlepage.length != 0 && pageObj.rightpage.length != 0;
                }else{
                    return false
                }
            }
        },
        methods:{
            changePg(page){//切换页码
                this.currentPage = page;
                this.pageObj = this.pageComput(page,this.allpage);
                this.showObj = this.currentShowPage(this.currentPage,this.listCound,this.limitNum);
            },
            pagePrev(){
                if(this.currentPage == 1) return;
                this.currentPage--;
                this.pageObj = this.pageComput(this.currentPage,this.allpage);
            },
            pageNext(){
                if(this.currentPage == this.allpage) return;
                this.currentPage++;
                this.pageObj = this.pageComput(this.currentPage,this.allpage);
            },
            pageComput(cur,all){ //计算页码
                var leftpage = [];
                var middlepage = [];
                var rightpage = [];
                if(all <= 10){//小于十页时 不做缩减处理
                    for(var i=1;i<=all;i++){
                        leftpage.push(i);
                    }
                }else if(cur <=4){//超过十页时 当前页在4页以前 1234567...20=>缩减7以后
                    for(var i=1;i<=(cur+2);i++){
                        leftpage.push(i);
                    }
                    rightpage.push(all);
                }else if(cur > 4 && cur < (all-3)){//超过十页 当前页不是最后4页 做两边缩减
                    leftpage.push(1);
                    for(var i=(cur-2);i<=(cur+2);i++){
                        middlepage.push(i);
                    }
                    rightpage.push(all);
                }else if(cur >= (all - 3)){//超过十页 当前页在最后3页 将这页居中 1...14 15 16 17 18 19 20
                    leftpage.push(1);
                    for(var i = (cur-3);i<=all;i++){
                        rightpage.push(i)
                    }
                }
                var pageResult = {
                    leftpage:leftpage,
                    middlepage:middlepage,
                    rightpage:rightpage
                }

                return pageResult;
            },
            currentShowPage(currentpage,listCount,limit){//计算显示当前显示的列表 开始 到 结束
                var allpage = this.allpage;
                var startList = (currentpage - 1) * limit + 1;
                var endList;
                var flag = true;
                if(listCount == 0){
                    startList = 0;
                    endList = 0;
                    flag = false;
                }
                if(currentpage != allpage && flag){
                    endList = currentpage * limit;
                }else if(currentpage == allpage){
                    endList  = listCount;
                }

                var currentshowPage = {
                    startlist:startList,
                    endlist:endList
                }
                return currentshowPage;
            },
        },
        watch:{
            "limitNum":{
                handler:function(val,oldval){
                    this.currentPage = 1;
                    this.pageObj = this.pageComput(this.currentPage,this.allpage);
                    this.showObj = this.currentShowPage(this.currentPage,this.listCound,this.limitNum);
                },
                deep:true
            }
        }
    }
</script>
<style>
    div.dataTables_paginate {
        float: right;
        margin: 0;
    }
    div.set-middle{
        margin-top:5px;
    }
    .pagination {
        margin: 20px 0;
    }

    .pagination ul {
        display: inline-block;
        margin-bottom: 0;
        margin-left: 0;
        border-radius: 4px;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
        padding: 0px;
    }

    .pagination ul > li {
        display: inline;
    }

    .pagination ul > li > a, .pagination ul > li > span {
        float: left;
        padding: 4px 12px;
        line-height: 20px;
        text-decoration: none;
        background-color: #fff;
        border: 1px solid #ddd;
        border-left-width: 0;
    }

    .pagination ul > li:first-child > a, .pagination ul > li:first-child > span {
        border-left-width: 1px;
        border-bottom-left-radius: 4px;
        border-top-left-radius: 4px;
        -moz-border-radius-bottomleft: 4px;
        -moz-border-radius-topleft: 4px;
    }

    .pagination ul > li {
        display: inline;
    }

    .pagination ul > .active > a, .pagination ul > .active > span {
        color: #999;
        cursor: default;
    }

    .pagination ul > li > a:hover, .pagination ul > li > a:focus, .pagination ul > .active > a, .pagination ul > .active > span {
        background-color: #f5f5f5;
    }

    .pagination ul > li > a, .pagination ul > li > span {
        float: left;
        padding: 4px 12px;
        line-height: 20px;
        text-decoration: none;
        background-color: #fff;
        border: 1px solid #ddd;
        border-left-width: 0;
    }

    .pagination ul > li:last-child > a, .pagination ul > li:last-child > span {
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
        -moz-border-radius-topright: 4px;
        -moz-border-radius-bottomright: 4px;
    }

    .pagination ul > .disabled > span, .pagination ul > .disabled > a, .pagination ul > .disabled > a:hover, .pagination ul > .disabled > a:focus {
        color: #999;
        cursor: default;
        background-color: transparent;
    }

    .pagination ul > li > a, .pagination ul > li > span {
        float: left;
        padding: 4px 12px;
        line-height: 20px;
        text-decoration: none;
        background-color: #fff;
        border: 1px solid #ddd;
        border-left-width: 0;
        cursor: pointer;
    }
</style>