<template>
    <div class="financeEditBox" v-cloak>
            <div class="accountBox">
                 <inputBox id='singleupdate' :querys='{name:"账面"+(accountData.type==2?"支出":"收入"),fid:accountData.id,content:accountData.total_money,keyword:"total_money"}'>
                <span slot="deco" class="base">账面{{accountData.type==2?"支出":"收入"}}</span>
                <span slot="input" class="base">
                        <span :class="accountData.type==2?'green':'red'">{{accountData.total_money}}</span>
                        <img src="../../assets/images/right.png">
                </span>
                </inputBox>
                <inputBox  id='singleupdate' :querys='{name:"交易对象",fid:accountData.id,content:accountData.company_name,keyword:"company_name"}'>
                    <span slot="deco" class="base" >交易对象</span>
                    <span slot="input" class="base">
                            <span>{{accountData.company_name}}</span>
                            <img src="../../assets/images/right.png">
                    </span>
                </inputBox>
                <inputBox>
                    <span slot="deco" class="base">付款方式</span>
                    <span slot="input" class="base">
                            <span>{{parseFloat(accountData.total_money)-parseFloat(accountData.paid_money)==0?"全额付款":"分期付款"}}</span>
                    </span>
                </inputBox>
                <inputBox >
                    <span slot="deco" class="base">支出类别</span>
                    <span slot="input" class="base">
                            <span>{{accountData.category_name}}</span>
                    </span>
                </inputBox>
                <inputBox>
                    <span slot="deco" class="base">结清状态</span>
                    <span slot="input" class="base">
                            <span  :class="accountData.type==2?'green':'red'">
                                {{parseFloat(accountData.total_money)-parseFloat(accountData.paid_money)==0?
                                "已结清":"未结清("+(parseFloat(accountData.total_money)-parseFloat(accountData.paid_money))+")"}}
                            </span>
                    </span>
                </inputBox>
            </div>
            <div class="fqbox" v-if="!(parseFloat(accountData.total_money)-parseFloat(accountData.paid_money)==0)">
                <div class="fq" v-for="(item,index) in accountData.items" :key=index>
                    <div class="backTitle">
                        第{{index+1}}笔付款
                    </div>
                    <inputBox id='singleupdate' :querys='{name:(accountData.type==2?"付":"收")+"款金额",iid:item.id,content:item.money,keyword:"money"}'>
                        <span slot="deco" class="base">{{accountData.type==2?"付":"收"}}款金额</span>
                        <span slot="input" class="base">
                                <span :class="accountData.type==2?'green':'red'">{{item.money}}</span>
                                <img src="../../assets/images/right.png">
                        </span>
                  </inputBox>
                  <inputBox id='singleupdate' :querys='{name:"支出类别",iid:item.id,content:item.account_name,keyword:"account"}'>
                        <span slot="deco" class="base">{{accountData.type==2?"付":"收"}}款账户</span>
                        <span slot="input" class="base">
                                <span>{{item.account_name}}</span>
                                <img src="../../assets/images/right.png">
                        </span>
                  </inputBox>
                   <inputBox  id='singleupdate' :querys='{name:(accountData.type==2?"支出":"收入")+"凭证",iid:item.id,keyword:"image",rid:accountData.id}'>
                        <span slot="deco" class="base">{{accountData.type==2?"支出":"收入"}}凭证</span>
                        <span slot="input" class="base">
                                <!-- <van-uploader :after-read="afterRead" name="file" :id="item.id"/> -->
                                <img :src=i.thumbnail v-for="(i,index) in item.images" :key=index class="camera">
                                <img src="../../assets/images/right.png">
                        </span>
                  </inputBox>
                    <inputBox id='singleupdate' :querys='{name:(accountData.type==2?"付":"收")+"款日期",iid:item.id,content:item.date,keyword:"date"}'>
                        <span slot="deco" class="base">{{accountData.type==2?"付":"收"}}款日期</span>
                        <span slot="input" class="base">
                                <span >{{item.date}}</span>
                                <img src="../../assets/images/right.png">
                        </span>
                  </inputBox>
                </div>
            </div>
            <div class="images" v-else>
                <inputBox>
                    <span slot="deco" class="base left">{{accountData.type==2?"支出":"收入"}}凭证</span>
                    <span slot="input" class="base">
                            <img :src=item.thumbnail  v-for="(item,index) in this.imageList" :key=index class="carema">
                    </span>
                </inputBox>
            </div>
            <div class="backTitle">
                备注
            </div>
              <inputBox id='singleupdate' :querys='{name:"备注",fid:accountData.id,content:accountData.remark,keyword:"remark"}'>
                    <span slot="deco" class="base">{{accountData.remark==""?"暂无备注":accountData.remark}}</span>
                    <span slot="input" class="base">
                            <img src="../../assets/images/right.png">
                    </span>
            </inputBox>
            <div class="backTitle">
            </div>
            <inputBox>
                    <span slot="deco" class="base">记账人</span>
                    <span slot="input" class="base">
                            <span slot="deco" class="base">{{accountData.user_nickname}}</span>                    
                    </span>
            </inputBox>
            <inputBox>
                    <span slot="deco" class="base">记账日期</span>
                    <span slot="input" class="base">
                            <span slot="deco" class="base">{{accountData.created_at}}</span>                    
                    </span>
            </inputBox>
            <inputBox>
                    <span slot="deco" class="base">更新日期</span>
                    <span slot="input" class="base">
                            <span slot="deco" class="base">{{accountData.updated_at}}</span>                    
                    </span>
            </inputBox>
            <div class="backTitle">
            </div>
            <div class="backTitle">
            </div>
            <div class="backTitle">
            </div>
            <div class="sequel">
                    <div class="bottonBase" @click="goToUrl('sequel')" v-if="parseFloat(accountData.total_money)-parseFloat(accountData.paid_money)!=0">后续{{accountData.type==2?"付款":"收款"}}</div>
                    <div class="bottonBase" @click="msgShow=true">删除</div>
            </div>
            <van-popup v-model="msgShow">
                <msgBox>
                    <div class="cancel chose" @click="msgShow=false" slot="cancel">取消</div>
                    <div class="del chose"  @click="delAccount" slot="del">删除</div>
                </msgBox>
        </van-popup>
    </div>
</template>

<script>
    import axios from "axios";
    import qs from "qs";
    import inputBox from "../../components/remember/inputDetail";
    import msgBox from "../../components/public/mesBox";


    export default{
        data(){
            return {
                token:"",
                id:"",
                iid:"",
                accountData:"",
                imageList:[],
                total_money:"",
                msgShow:false
            }
        },
        components:{
            inputBox,
            msgBox
        },
        mounted(){
            this.token = localStorage.getItem("accessToken");
            this.getAccount();
        },
        methods:{
            delAccount:function(){
                this.$toast.loading({
                    mask: true,
                    message: '加载中...'
                });
                let id = this.$route.query.id;
                axios.post(this.GLOBAL_.apiUrl+`api/record/delete?id=${id}&token=${this.token}`).then(
                    res=>{
                        if(res.data.code==0)
                        {
                            this.msgShow = false;
                            this.waitPush(this,"删除成功",-1)
                            
                        }
                        else{
                            this.$toast.fail(res.data.data);
                        }
                    }
                )
            },
            goToUrl:function(url){
                this.$router.push(url)
            },
            afterRead:function(file){
                
                let fd = new FormData()
                fd.append('file', file.file)
                 axios.post(this.GLOBAL_.apiUrl+`api/upload/image?token=${this.token}`,fd,{headers: {
                     'Content-Type': 'multipart/form-data'
                 }}).then(
                                res=>{
                                    let key = res.data.data.file.fileKey;
                                    let params={
                                        image_keys:key
                                    }
                                    axios.post(this.GLOBAL_.apiUrl+`api/record/item/update?itemId=${this.id}&token=${this.token}`,qs.stringify(params)).then(
                                        res=>{
                                        }
                                    )
                                }
                            )
            },
            getAccount:function(){
                this.$toast.loading({
                    mask: true,
                    message: '加载中...'
                });
                this.id = this.$route.query.id;
                axios.get(this.GLOBAL_.apiUrl+`api/record/detail?id=${this.id}&token=${this.token}`).then(
                    res=>{
                        if(res.data.code==0){
                            this.$toast.clear();
                            this.accountData = res.data.data;
                            for(let item of res.data.data.items){
                                this.imageList = this.imageList.concat(item.images);
                            }
                        }
                        else{
                            this.$toast.fail(res.data.data)
                        }
                    }
                )
            },
            goToUrl:function(url){
                this.$router.push({path:url,query:{id:this.id,type:this.accountData.type}})
            }
        }
    }
</script>


<style lang="less" scoped>
    @import "../../css/const.less";
    @import "../../../node_modules/vant/lib/index.css";
    @import "../../css/public.less";
    v-cloak{
        display:none
    }
    .financeEditBox{
        margin-top:@marginTop;
        .green{
            color:green;
        }
        .red{
            color:red;
        }
    }

     .carema{
        width:5em!important;
        height:5em!important;
    }

  
    .backTitle{
            background:#eee;
            color:#666;
            height:2em;
            padding:0.5em;
            box-sizing: border-box;
    }

    .sequel{
        width:100%;
        height:6em;
        background:#eee;
        position:fixed;
        bottom:0;
        display:flex;
        flex-direction: column;
        justify-content:space-around;
        .bottonBase{
            width:60%;
            background:@background;
            color:#fff;
            margin:0 auto;
            text-align: center;
            font-size:16px;
            height:1.6em;
            padding:0.3em;
            box-sizing: border-box;
            border-radius: 10px;
        }
    }
</style>