/**
 * Created by fengxiaotx on 2016/3/18.
 */
import Vue from "vue";
module.exports = {
    props:{
        "data":{
            type:Array,
            default:function(){
                return [];
            }
        },
        "isNewData":{
            default:function(){
                return true;
            }
        },
        "value":{
            twoWay: true
        },
        "text":{
            twoWay: true
        },
        "valueField":{
            type:String,
            default:function(){
                return "id";
            }
        },
        "displayField":{
            type:String,
            default:function(){
                return "text";
            }
        },
        "selectType":{
            type:String,
            default:function () {
                return "All";
            }
        },
        "boxShow":{
            type:Boolean,
            twoWay:true
        }
    },
    data:function(){
        return {
            tempTreeData:[],
            dataFormatReady:false,
            selectRecord:null
        }
    },
    computed:{

    },
    created:function () {
        let me = this;
        if(!me.dataFormatReady){
            me.initData();
            me.dataFormatReady = true;
        }

    },
    ready:function () {

    },
    watch:{
        'value':{
           // immediate: true,
            handler: function (newValue, oldVal){
                if(!oldVal){
                    this.setValue(newValue);
                }
            }
        },
        'selectRecord':{

        }
    },
    events:{
        "setData":function(data){
            me.initData(data,1,null);
            me.data = me.tempTreeData;
        }
    },
    methods:{
        initData:function () {
            let me = this;
            me.tempTreeData = [];
            me.formatData(me.data,1,null);
            me.data = me.tempTreeData;
        },
        formatData:function(items,level,parent){
            let me = this;
            let spaceHtml = "";
            for(var i=1;i<level;i++){
                spaceHtml+="<i class='ms-tree-space'></i>"
            }
            if(items && items.length>0){
                _.each(items,function(item,index){
                    if(level === 1){
                         Object.assign(item,{"level":level,"spaceHtml":spaceHtml,"isShow":true});
                        if(!item.expanded){
                            Object.assign(item,{"expanded":false});
                        }
                        item = Object.assign({},item);
                    }

                    me.tempTreeData.push(item);
                    let currentIndex = me.tempTreeData.length-1;
                    if(level != 1){
                        Vue.set(me.tempTreeData[currentIndex],'parent',parent);
                        Vue.set(me.tempTreeData[currentIndex],'level',level);
                        Vue.set(me.tempTreeData[currentIndex],'spaceHtml',spaceHtml);
                        if(!me.tempTreeData[currentIndex].expanded){
                            Vue.set(me.tempTreeData[currentIndex],'expanded',false);
                            Vue.set(me.tempTreeData[currentIndex],'isShow',false);
                        }else {
                            Vue.set(me.tempTreeData[currentIndex],'isShow',true);
                        }
                    }
                    if(me.tempTreeData[currentIndex].children  && me.tempTreeData[currentIndex].children.length>0){
                        me.formatData(me.tempTreeData[currentIndex].children,level+1,me.tempTreeData[currentIndex]);
                    }
                });
            }
        },
        show:function(record){
            return ((record.level==1) || (record.parent && record.parent.expanded && record.isShow));
        },
        isLeaf:function(record){
            return (!record.children );
        },
        toggle:function(index,record){
            let me = this;
            if(record.expanded){
                record.expanded = !record.expanded;
                me.close(index,record);
            }else {
                record.expanded = !record.expanded;
                me.open(index,record);
            }
        },
        open:function(index,record){
            let me = this;

            if(record.children){
                open(index,record.children);
            }

            function open(index,records){
                _.each(records,function(child,childIndex){
                    child.isShow = true;
                    if(child.children){
                        open(index+childIndex+1,child.children);
                    }
                });
            }
        },
        close:function(index,record){
            let me = this;
            if(record.children){
                close(index,record.children);
            }

            function close(index,records){
                _.each(records,function(child,childIndex){
                    child.isShow = false;
                    if(child.children){
                        close(index+childIndex+1,child.children);
                    }
                });
            }
        },
        showUpLevel:function(record){
            let me = this;
            if(record.parent){
                record.parent.expanded = true;
                let children = record.parent.children;
                if(children ){
                    _.each(children,function(child,childIndex){
                        child.isShow =true;
                    });
                }
                if(record.parent.parent){
                    me.showUpLevel(record.parent);
                }
            }
        },
        selectValue:function(index,record){
            let me = this;
            me.selectType = me.selectType.toLowerCase();
            if(me.selectType === "folder"){
                if(!record.children || record.children.length<=0){
                    return ;
                }
            }else if(me.selectType === "leaf"){
                if(record.children && record.children.length>0){
                    return ;
                }
            }
            me.value = record[me.valueField];
            me.text = record[me.displayField];
            me.selectRecord = record;
            me.boxShow = false;
        },
        setValue:function(value){
            let me = this;
            if(!me.dataFormatReady){
                me.initData();
                me.dataFormatReady = true;
            }
            if(me.data && me.data.length>0){
                _.each(me.data,function(item,index){
                    if(item[me.valueField] === value){
                        me.value = value;
                        me.text = item[me.displayField];
                        me.selectRecord = item;
                        me.showUpLevel(me.data[index]);

                    }
                });
            }

        },
        test:function(){
            alert("sss");
        }
    }
}