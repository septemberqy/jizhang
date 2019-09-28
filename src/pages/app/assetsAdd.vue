<template>
    <div class="box">   
            <titleCell>请输入新的账户名称</titleCell>
            <inputBox>
                <span slot="deco" class="base">账户名称</span>
                <span slot="input" class="base">
                         <input type="text" name="name" placeholder="请输入账户名称" slot="input" v-model=name>
                </span>
            </inputBox>
            <titleCell></titleCell>
             <inputBox>
                <span slot="deco" class="base">账户类型</span>
                 <span slot="input" class="base">
                    <a @click="getAllowList()">
                        {{typeName==""?"请选择":typeName}}
                        <img src="../../assets/images/right.png">
                        <!-- <img src="../../assets/images/down.png" v-else-if=getAllowList(0)> -->
                    </a>
                </span>
            </inputBox>
            
            <van-radio-group v-model="type" v-show=show>
                        <van-radio class="radiobox" v-for="(items,index) in typeList" :key=index :name=items.typeId @click="showType(items.name)">{{items.name}}</van-radio>
            </van-radio-group>
            <inputBox>
                <span slot="deco" class="base">初始金额</span>
                <span slot="input" class="base">
                         <input type="text" name="name" placeholder="0.00" slot="input" v-model=account_money>
                </span>
            </inputBox>
            <textarea class="message" v-model="remark" placeholder="备注"></textarea>
            <div class="addBottom bottombase" @click="addAccount">
                        添加
            </div>
    </div>
</template>

<script>
    import inputBox from "../../components/remember/inputDetail";
    import titleCell from "../../components/public/titilCell";
    import axios from "axios";
    import qs from "qs";
    export default{
        data(){
            return {
                token:"",
                name:this.$route.query.name,
                show:false,
                type:"",
               account_money:"",
                remark:"",
                typeList:[
                    {
                        typeId:1,
                        name:'现金'
                    },
                    {
                        typeId:2,
                        name:'银行'
                    },
                    {
                        typeId:3,
                        name:'支付平台'
                    },
                    {
                        typeId:4,
                        name:"其他"
                    }
                ],
                 typeName:"",
            }
        },
        mounted(){
            this.token = localStorage.getItem("accessToken");
           this.getTypeName();
        },
        components:{
            inputBox,
            titleCell
        },
        methods:{
            getAllowList:function(){
                this.show=!this.show;
            },
            showType:function(name){
                this.typeName=name;
                this.show=false;
            },
            addAccount:function(){
               
   
                if(this.name==undefined){
                    this.$toast("账户名称不能为空")
                }
                else if(this.typeName==""){
                    this.$toast("请选择资产类型")
                }
                else{
                     this.$toast.loading({
                        mask: true,
                        message: '加载中...'
                    });
                    var regPos = /^\d+(\.\d+)?$/; 
                    this.account_money= regPos.test(this.account_money)?this.account_money:"";
                    let params={
                        name:this.name,
                        type:this.type,
                        remark:this.remark,
                        sort:10,
                        initial_balance:this.account_money
                    }
                    axios.post(this.GLOBAL_.apiUrl+`api/account/create?token=${this.token}`,qs.stringify(params)).then(
                        res=>{
                            if(res.data.code==0){
                                this.waitPush(this,"保存成功",-1)
                            }
                            else{
                                this.$toast.fail(res.data.data)
                            }
                        }
                    )
                }
            },
            getTypeName: function(){
                    
                    for(let item of this.typeList){
                        if(this.$route.query.type==item.typeId){
                            this.type=this.$route.query.type;
                            this.typeName=item.name
                        }
                    }
                }
        }
    }
</script>



<style lang="less" scoped>
    @import "../../../node_modules/vant/lib/index.css";
    @import "../../css/public.less";
    @import "../../css/const.less";
    .box{
        margin-top:@marginTop;
    }

     
</style>