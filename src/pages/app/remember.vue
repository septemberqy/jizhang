<template>
    <div class="box">
        <div v-show=mainPage>
            <div class="topChoise">
                    <div class="in base" :class="{'is-back':Bk}" @click="changeBk('in')">
                        收入
                    </div>

                    <div class="out base" :class="{'is-back':!Bk}" @click="changeBk('out')">
                        支出
                    </div>
            </div>
            <inputBox>
                <span slot="deco" class="base">账面{{keyword}}</span>
                <input type="text" name="number" placeholder="0.00" slot="input" v-model=total_money class="remeberInput">
            </inputBox>
            <inputBox>
                <span slot="deco" class="base">交易对象</span>
                <input type="text" name="obj" placeholder="交易对象" slot="input" v-model=obj  class="remeberInput">
            </inputBox>
            <inputBox>
                <span slot="deco" class="base">{{act}}款方式</span>
                <span slot="input" class="base">
                    <a @click.capture="showCell(0)">
                        {{payMethod==1?"全额支付":"分期付款"}}
                        <img src="../../assets/images/right.png" v-if=!getAllowList(0)>
                        <img src="../../assets/images/down.png" v-else-if=getAllowList(0)>
                    </a>
                </span>
            </inputBox>
            <inputBox v-if="payMethod==2">
                <span slot="deco" class="base">首笔支付</span>
                <input type="text" name="obj" placeholder="0.00" slot="input" v-model=money>
            </inputBox>
            <van-radio-group v-model="payMethod" v-show=getAllowList(0)>
                        <van-radio name="1"  class="radiobox" >全额付款</van-radio>
                        <van-radio name="2"  class="radiobox">分期付款</van-radio>
            </van-radio-group>
        
            <inputBox>
                <span slot="deco" class="base"> {{act}}款账户</span>
                <span slot="input" class="base">
                    <a @click="showCell(1)">
                        {{getAccountDeco(payAccount)}}  
                        <img src="../../assets/images/right.png" v-if=!getAllowList(1)>
                        <img src="../../assets/images/down.png" v-else-if=getAllowList(1)>
                    </a>
                </span>
            </inputBox>
            
            <van-radio-group v-model="payAccount" v-show=getAllowList(1) >
                        <van-radio class="radiobox" v-for="(items,index) in payAccountData" :key=index :name=items.id>{{items.name}}</van-radio>
            </van-radio-group>
            <inputBox>
                <span slot="deco" class="base">{{keyword}}类别</span>
                <span slot="input" class="base">
                    <a @click="showCell(2)">
                        {{categroyId==0?"请选择":categroyName}}
                        <img src="../../assets/images/nextPage.png">
                    </a>
                </span>
            </inputBox>
            <inputBox>
                <span slot="deco" class="base">{{act}}款日期</span>
                <span slot="input" class="base">
                    <div type="primary" @click="showPopup">
                        {{addTime}}
                        <img src="../../assets/images/right.png" v-if=!getAllowList(3)>
                        <img src="../../assets/images/down.png" v-else-if=getAllowList(3)>
                   </div>
                </span>
            </inputBox>
            <van-popup v-model="show"  position="bottom" :style="{ height: '40%',width:'100%'}">
            <van-datetime-picker
                v-model="currentDate"
                type="date"
                :min-date="minDate"
                @confirm="show=false"
                @change="getTime"
                @cancel="cancelTime"
            />
            </van-popup>
            
            
            
                
            <textarea class="message" v-model="message" placeholder="备注"></textarea>
            <div class="addBtn" @click="saveFinance">
                添加账目
            </div>
        </div>
        <div v-show=!mainPage>
                <div class="categroybox">
                        <categroy-item v-for="(item,index) in categroy" :key=index >
                            <span @click="choiseCategroy(item)">{{item.name}}</span>
                        </categroy-item>
                </div>
                <div class="addBottom bottombase" @click="categroyShowPopup">
                        新增
                </div>
                <van-popup v-model="categroyShow" :style="{width:'100%',height:'8em'}">
                        <div class="addCategroyPage">
                            <input type="text"  v-model="addCategroy" class="addCategroy" autofocus>
                            <button class="addCategroyBtn" @click="addCategroyMethod(typeId,addCategroy)">添加</button>
                        </div>
                </van-popup>
                <div class="closeBottom bottombase" @click="mainPage=true">
                        关闭
                </div>
        </div>
    </div>
</template>

 



<script>
    import inputBox from "../../components/remember/inputDetail"
    import radiobox from "../../components/remember/radiobox"
    import axios from "axios"
    import qs from "qs"
    import categroyItem from "../../components/remember/categroyItem"
    export default{
        data(){
            return {
                voShow:false,
                token:"",
                Bk:true,
                keyword:"收入",
                act:"收",
                activeNames: ['1'],
                allow:require("../../assets/images/right.png"),
                allowList:[false,false,false,false],
                a:0,
                payMethod: '1',
                payAccountData:[],
                payAccount:"0",
                mainPage:true,
                currentDate: new Date(),
                 minDate: new Date(2018,1,1),
                 maxDate: new Date(),
                 show: false,
                 addTime : "",
                 typeId:1,
                 categroy:[],
                 categroyId:0,
                 categroyName:"hahaha",
                 categroyShow:false,
                 addCategroy:"",
                 message:"",
                 total_money:"",//交易金额
                  obj:"",
                  money:""
            }
        },
        mounted(){
        this.token = localStorage.getItem("accessToken");
            this.getAccount(this.token);
            this.getDefaultTime();
        },
        components:{
            inputBox,
            radiobox,
            categroyItem
        },
        computed:{
            getAllowList(){
                return function (value){
                    return this.allowList[value]
                }
            },
            getAccountDeco(){
                return function(value){
                    if(value==0)
                    {
                        return "请选择";
                    }
                    else{
                        for(let item of this.payAccountData){
                            if(value==item.id)
                            {
                                return item.name;
                            }
                        }
                        return "请选择";
                    }
                }
            }
        },
        watch:{
           
            payMethod:function(value){
                this.allowList.splice(0,1,false)
            },
            payAccount:function(value){
                this.allowList.splice(1,1,false)
            }
        },
        methods:{
            cancelTime:function(){
                this.getDefaultTime();
                this.show=false;
            },
            getDefaultTime:function(){
                let now = new Date();
                this.addTime = now.getFullYear()+"-"+(now.getMonth()+1)+"-"+now.getDate();
            },
             getTime:function(e){
                 let changeValue = e.getValues();
                 this.addTime = changeValue.join("-");
            },
            showPopup() {
                this.show = true;
            },
            categroyShowPopup(){
                this.addCategroy="";
                this.categroyShow=true;
            },
            changeBk:function(value){
                if(value=="in")
                {
                    this.Bk=true;
                    this.keyword="收入";
                    this.act="收";
                    this.typeId=1
                }
                else{
                    this.Bk=false;
                    this.keyword="支出";
                    this.act="付";
                    this.typeId=2
                }
                this.total_money = "";
                this.obj = "";
                this.money="";
                this.payMethod=1;
                this.categroyId=0;
                this.payAccount=0;
            },
           showCell:function(value){
              this.allowList.splice(value,1,!this.allowList[value]);
              if(value==2){
                  this.mainPage = false;
                  this.getCategroy(this.token,this.typeId)
              }
            },
            getAccount:function(token){
                axios.get(this.GLOBAL_.apiUrl+"api/account?token="+token).then(
                    res=>{
                        for(let item of res.data.data) {
                            let sData={};
                            sData["id"] = item.id;
                            sData['name'] = item.name;
                            this.payAccountData.push(sData);
                        }
                    }
                )
            },
            choiseCategroy:function(item){
                this.categroyId = item.id;
                this.categroyName = item.name;
                this.mainPage=true;
            },
            addCategroyMethod:function(typeId,addCategroy){
                let param ={
                    parent_id:0,
                    type:typeId,
                    name:addCategroy,
                    sort:10
                };
                axios.post(this.GLOBAL_.apiUrl+"api/category/create?token="+this.token,qs.stringify(param)).then(
                    res=>{
                        if(res.data.status==true){
                            this.getCategroy(this.token,typeId);
                            this.categroyShow=false;
                        }
                    }
                )
            },
            getCategroy:function(token,typeId){
                this.categroy = []
                axios.get(this.GLOBAL_.apiUrl+"api/category?token="+token+"&type="+typeId).then(
                    res=>{
                        for(let item of res.data.data){
                            let sData = {};
                            sData['id'] = item.id;
                            sData["name"] = item.name;
                            this.categroy.push(sData);
                        }
                    }
                )
            },
            saveFinance:function(){
                this.$toast.loading({
                    mask: true,
                    message: '加载中...'
                });
                
                let param = {
                    total_money:this.total_money,
                    money:this.payMethod==1?this.total_money:this.money,
                    company_name:this.obj,
                    account_id:this.payAccount,
                    category_id:this.categroyId,
                    date:this.addTime,
                    remark:this.message,
                    image_keys:""
                }
                axios.post(this.GLOBAL_.apiUrl+"api/record/create?token="+this.token,qs.stringify(param)).then(
                    res=>{
                        if(res.data.code==0){
                            this.$toast.success("保存成功")
                            this.$router.go(-1);
                        }
                        else{
                            this.$toast.fail(res.data.data);
                        }
                    }
                )
            }
        }
    }
</script>


<style lang="less" scoped>
    @import "../../css/const.less";
    @import "../../../node_modules/vant/lib/index.css";
    @import "../../css/public.less";
    .box{
        margin-top:@marginTop;
        .topChoise{
            width:60%;
            height:2em;
            margin:4em auto 2em;
            display:flex;
            border:1px solid @background;
            .base{
                width:50%;
                text-align: center;
                line-height: 2em;
                font-size:16px;
                color:#666;
                font-weight: bold;
            }
            .is-back{
                background:@background;
                color:#fff;
            }
        }
    }
   

  
   .closeBottom{
       bottom:2em;
   }

    .addBottom{
        bottom:5em;
    }
    .addCategroyPage
    {
        display:flex;
        flex-direction: column;
        .addCategroy{
            width:80%;
            margin:1em auto;
            height:2em;
            font-size:18px;
            padding-left:1em;
        }
        .addCategroyBtn{
            width:6em;
            margin:0 auto;

        }
    }
  .categroybox{
        width:90%;
        height:6em;
        margin:3em auto 0;
        display:flex;
        flex-wrap: wrap;
        flex-direction: row;
        justify-content:space-between;
  }


   .addBtn{
       width:30%;
       height:2em;
       background:@background;
       text-align: center;
       line-height: 2em;
       color:#fff;
       font-weight: bold;
       margin:0 auto;
   }

   
</style>