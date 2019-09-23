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
                        {{typeName}}
                        <img src="../../assets/images/right.png">
                        <!-- <img src="../../assets/images/down.png" v-else-if=getAllowList(0)> -->
                    </a>
                </span>
            </inputBox>
            <van-radio-group v-model="type" v-show=show>
                        <van-radio class="radiobox" v-for="(items,index) in typeList" :key=index :name=items.typeId @click="showType(items.name)">{{items.name}}</van-radio>
            </van-radio-group>
            <textarea class="message" v-model="remark" placeholder="备注"></textarea>
            <div class="addBottom bottombase" @click="updateAccount">
                        修改
            </div>
    </div>
</template>

<script>
    import inputBox from "../../components/remember/input-detail";
    import titleCell from "../../components/public/titil-cell";
    import axios from "axios";
    import qs from "qs";
    let token = localStorage.getItem("accessToken");
    export default{
        data(){
            return {
                name:this.$route.query.name,
                show:false,
                type:"",
               
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
            updateAccount:function(){
                let params={
                    name:this.name,
                    type:this.type,
                    remark:this.remark,
                    sort:10
                }
                axios.post(this.GLOBAL_.apiUrl+`api/account/update?id=${this.$route.query.id}&token=${token}`,qs.stringify(params)).then(
                    res=>{
                        if(res.data.code==0){
                            this.$toast('保存成功');
                            this.$router.go(-1)
                        }
                    }
                )
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

<style lang="less">
    @import "../../../node_modules/vant/lib/index.less";
    @import "../../css/public.less";

    .box{
        margin-top:5em;
    }

  
</style>