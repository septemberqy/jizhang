<template>
    <div>
        <div class="box" v-cloak>
            <titleCell>
                账面收支{{detailItems.month}}月
            </titleCell>
            <inputBox id="financedetail">
                <span slot="deco" class="base">账面收入</span>
                <span slot="input" class="base">
                        <span class="in">{{parseFloat(detailItems.in).toFixed(2)}}</span>
                        <img src="../../assets/images/right.png">
                </span>
            </inputBox>

            <inputBox  id="financedetail">
                <span slot="deco" class="base">账面支出</span>
                <span slot="input" class="base">
                        <span class="out">{{parseFloat(detailItems.out).toFixed(2)}}</span>
                        <img src="../../assets/images/right.png">
                </span>
            </inputBox>

            <inputBox  id="financedetail">
                <span slot="deco" class="base">账面利润</span>
                <span slot="input" class="base">
                        <span class="profit">{{(parseFloat(detailItems.in).toFixed(2)-parseFloat(detailItems.out).toFixed(2)).toFixed(2)}}</span>
                        <img src="../../assets/images/right.png">
                </span>
            </inputBox>

            <titleCell>
                待收/待付
            </titleCell>
            <inputBox id="financedetail" :querys="{type:1}">
                <span slot="deco" class="base">待收入</span>
                <span slot="input" class="base">
                        <span class="in">{{parseFloat(waitIn).toFixed(2)}}</span>
                        <img src="../../assets/images/right.png">
                </span>
            </inputBox>

             <inputBox id="financedetail" :querys="{type:2}">
                <span slot="deco" class="base">待支出</span>
                <span slot="input" class="base">
                        <span class="out">{{parseFloat(waitOut).toFixed(2)}}</span>
                        <img src="../../assets/images/right.png">
                </span>
            </inputBox>
        <!-- <detail>
            <span slot="month">{{detailItems.month}}</span>
            <span slot="in"><a @click="show('in')">{{detailItems.in}}</a></span>
            <span slot="out" ><a @click="show('out')">{{detailItems.out}}</a></span>
        </detail> -->
        </div>
        
        <!-- <div id="myChart">
        </div> -->

        <a @click="goToUrl('remember')">
            <div class="add">
                记一笔
            </div>
        </a>
    </div>
</template>

<script>
    import axios from "axios";
    import detail from "../../components/finance/detail";
    import {getMaxDay} from "../../api/getMaxDay.js";
    import {bt,colorList} from "../../api/charts.js";
     import inputBox from "../../components/remember/inputDetail"
     import titleCell from "../../components/public/titilCell"
    
    export default{
        mounted(){
            this.token = localStorage.getItem("accessToken");
            this.getHome(this.token);
            this.getId(this.token);
        },
        data(){
            return {
             token:"",
             detailItems:[{in:0,out:0,month:"0"}],
             btdate:"",
             isShow:"out",
             title:"",
             waitIn:"",
             waitOut:""
            }
        },
        methods:{
            getHome:function(){
                this.$toast.loading({
                    mask: true,
                    message: '加载中...'
                });
                axios.get(this.GLOBAL_.apiUrl+"api/view/home?token="+this.token).then(
                    res=>{
                        if(res.data.code==0){
                            this.$toast.clear();
                            this.detailItems = res.data.data.account;
                            this.waitIn = res.data.data.waitingForCollection; 
                            this.waitOut = res.data.data.waitingForPayment;
                        }
                        else{
                            if(res.data.data=="INVALID_TOKEN")
                            {
                                this.$router.push("login")
                            }
                            this.$toast.fail(res.data.data)
                        }
                    }
                )
            },
            goToUrl:function(url){
                this.$router.push(url);
            },
            getId:function(){
                axios.get(this.GLOBAL_.apiUrl+"api/account?token="+this.token).then(
                    res=>{
                    }
                )
            },
            show:function(value){
                this.setBt(this.token);
                this.isShow = value;
            },
           
            setBt(token)
            {
                    axios.get(this.GLOBAL_.apiUrl+"api/account?token="+token).then(
                    res=>{
                    if(res.data.code==0){
                        let legendData = [];
                        let seriesInData = [];
                        let seriesOutData = [];
                        for(var item of res.data.data){
                            let sData = {};
                            sData["name"] = item.name;
                            sData['value'] = Math.abs(item.balance);

                            if(item.balance>0)
                            {
                                seriesInData.push(sData);
                                seriesOutData.push({"name":sData['name'],value:0});
                            }
                            else{
                                seriesOutData.push(sData);
                                seriesInData.push({"name":sData['name'],value:0});
                            }
                            legendData.push(item.name);
                        }
                        if(this.isShow=="in"){
                            bt(legendData,seriesInData,"myChart",this.detailItems.month+"收入");
                        }
                        else{
                            bt(legendData,seriesOutData,"myChart",this.detailItems.month+"支出");
                        }
                    }
                });
            }
        },
        components:{
            detail,
            inputBox,
            titleCell
        }
    }
</script>



<style lang="less" scoped>
   @import "../../css/public.less";
    @import "../../../node_modules/vant/lib/index.css";
    @import "../../css/const.less";

    .box{
        margin-top:@marginTop;
        // height:3em;

       
    }
     #myChart{
            margin:4em auto 0;
            width:80%;
            height:16em;
        }

        .add{
            width:80%;
            background:@background;
            height:2em;
            text-align: center;
            margin:5em auto 0;
            line-height: 2em;
            color:#fff;
            font-weight: bold;
        }
</style>