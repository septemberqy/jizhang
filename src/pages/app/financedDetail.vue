<template>
    <div class="financebox">
        <div class="headerNav">
            <div class="date" @click="show('month')" :class="{ active: isActive('month') }">当月收支</div>
            <div class="date"  @click="show('month3')" :class="{ active: isActive('month3') }">季度收支</div>
            <div class="date" @click="show('month12')" :class="{ active: isActive('month12') }">当年收支</div>
        </div>
        <div class="pageInfo">
            <div class="info">
                    <span class="pageTitle">{{pageTitle}}:</span><em class="green">{{beginData}}</em> - <em class="green">{{endData}}</em>
            </div>
            <div class="info">
                <div class="infoDetail">
                    <span class="pageTitle">账面收入:</span><em class="red">{{this.in}}</em>
                </div>
                <div class="infoDetail">
                    <span class="pageTitle">账面利润:</span><em class="orange">{{this.profit}}</em>
                </div>
                <div class="infoDetail">
                    <span class="pageTitle">账面支出:</span><em class="green">{{this.out}}</em>
                </div>
            </div>
        </div>
        <div class="main">
            

            <financeDetailCell v-for="(item,index) in accountList" :key=index :id=item.id>
                <img src="../../assets/images/pay_money.png" slot="typeIcon"  class="typeIcon" v-if="item.type==2">
                <img src="../../assets/images/income_money.png" slot="typeIcon"  class="typeIcon" v-if="item.type==1">
                <span slot="date" class="date">{{item.date.substring(5)}}</span>
                <span slot="objName" class="objName">{{item.company_name}}</span>
                <div class="waitBox" slot="wait" :class="{ishidden:parseFloat(item.total_money)-parseFloat(item.paid_money)==0}">
                    <span  :class="{green:item.type==2,red:item.type==1,base:true}" >待{{item.type==1?"收":"付"}}款:{{parseFloat(item.total_money)-parseFloat(item.paid_money)}}</span>
                </div>
                <span slot="money" class="money">{{item.total_money}}</span>
            </financeDetailCell>
        </div>
        <noMore>没有更多数据</noMore>
    </div>
</template>

<script>
    import axios from "axios";
    import qs from "qs";
    import financeDetailCell from "../../components/finance/financeDetailCell";
    import noMore from "../../components/finance/noMore";

    export default{
        data(){
            return {
                token:"",
                nowPage:"month",
                beginData:"",
                endData:"",
                pageTitle:"",
                in:0,
                out:0,
                profit:0,
                accountList:""
            }
        },
        components:{
            financeDetailCell,
            noMore
        },
        mounted(){
            this.token = localStorage.getItem("accessToken");
            this.show("month");
            this.pageTitle="当月";
        },
        methods:{
            isActive:function(val){
                return this.nowPage==val;
            },
           
            show:function(val){
                let d = new Date();
                this.nowPage = val;
                if(val=="month"){
                    this.pageTitle = "当月";
                    if((d.getMonth()+1)<10)
                    {
                        this.beginData =  d.getFullYear() +"-0"+(d.getMonth()+1)+"-"+"01";
                         this.endData = d.getFullYear() +"-0"+(d.getMonth()+1)+"-"+new Date(d.getFullYear(),d.getMonth()+1,0).getDate();
                    }
                    else
                    {
                        this.beginData =  d.getFullYear() +"-"+(d.getMonth()+1)+"-"+"01";
                         this.endData = d.getFullYear() +"-"+(d.getMonth()+1)+"-"+new Date(d.getFullYear(),d.getMonth()+1,0).getDate();

                    }
                }
                else if(val=="month3"){
                    this.pageTitle = "季度";
                    let month = d.getMonth()+1;
                    if(month>=1 && month<=3)
                    {
                        this.beginData =  d.getFullYear()+"-01-01";
                        this.endData = d.getFullYear()+"-03-31";
                    }
                    else if(month>=4 && month<=6)
                    {
                        this.beginData =  d.getFullYear()+"-04-01";
                        this.endData = d.getFullYear()+"-06-31";
                    }
                    else if(month>=7 && month<=9)
                    {
                        this.beginData =  d.getFullYear()+"-07-01";
                        this.endData = d.getFullYear()+"-09-30";
                    }
                    else if(month>=10 && month<=12)
                    {
                        this.beginData =  d.getFullYear()+"-10-01";
                        this.endData = d.getFullYear()+"-12-31";
                    }
                }
                else if(val=="month12"){
                    this.pageTitle = "当年";
                    this.beginData = d.getFullYear()+"-01-01";
                    this.endData = d.getFullYear()+"-12-31";
                }
                let params = {
                    begin_date:this.beginData,
                    end_date:this.endData,
                    type:3
                }
                axios.get(this.GLOBAL_.apiUrl+`api/record/account?token=${this.token}&begin_date=${this.beginData}&end_date=${this.endData}&type=3`).then(
                    res=>{
                        if(res.data.code==0){
                            this.in = res.data.data.in;
                            this.out = res.data.data.out;
                            this.profit = this.in-this.out;
                            this.accountList =res.data.data.list;
                        }
                    }
                )
            }
        }
    }
</script>

<style lang="less">
    @import "../../css/public.less";

    .financebox{
        margin-top:5em;
        display:flex;
        flex-direction: column;
        .headerNav{
            display:flex;
            flex-direction:row;
            justify-content: space-around;
            background:@background;
            height:3em;
            .date{
                width:6em;
                height:2em;
                border:1px solid #fff;
                line-height: 2em;
                text-align: center;
            }
            .active{
                background:#fff;
                color:@background;
            }
        }
        .pageInfo{
            width:100%;
            height:8em;
            background:#eee;
            .info{
                width:90%;
                margin:1em auto 0; 
                display:flex;
                flex-direction: row;
                flex-wrap: wrap;
                .pageTitle{
                    margin-right:1em;
                }
                .infoDetail{
                    width:50%;
                    margin-top:0.5em;
                }
            }
            .green{
                color:green;
            }
            .red{
                color:red;
            }
            .orange{
                color:orange;
            }
        }
    }
</style>