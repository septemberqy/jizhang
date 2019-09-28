<template>
    <div class="box">
        <van-swipe-cell  v-for="(item,index) in account" :key=index class="cateType">
            <van-cell :border="false" :title=item.name :value=item.balance value-class="in"/>
            <template slot="right">
                <van-button square type="primary" text="编辑" @click="assetsedit(item.id,item.name,item.type,item.remark)"/>
                <van-button square type="danger" text="删除" @click="showPopup(item.id)"/>
            </template>
        </van-swipe-cell>
        <div class="assetsMangeBox">
            <div class="assetsMangeBtn bottombase" @click="goToUrl('assetsadd')" v-if="this.account!=''">
                            添加资产账户
            </div>
        </div>
        <van-popup v-model="show">
            <msgBox>
                <div class="cancel chose" @click="show=false" slot="cancel">取消</div>
                <div class="del chose" @click="delAccount()" slot="del">删除</div>
            </msgBox>
        </van-popup>
    </div>
</template>

<script>
    import axios from "axios";
    import inputBox from "../../components/remember/inputDetail";
    import msgBox from "../../components/public/mesBox";

    
    export default{
        data(){
            return {
                token:"",
                account:"",
                show:false,
                delId:""
            }
        },
        mounted(){
            this.token = localStorage.getItem("accessToken");
            this.getAccount(this.token)
        },
        methods:{
            getAccount:function(token){
                this.$toast.loading({
                    mask: true,
                    message: '加载中...'
                });
                axios.get(this.GLOBAL_.apiUrl+"api/account?token="+this.token).then(
                    res=>{
                        if(res.data.code==0)
                        {
                            this.$toast.clear();
                            this.account = res.data.data;
                        }
                        else{
                            this.$toast.fail(res.data.data)
                        }
                    }
                )
            },
            assetsedit:function(id,name,type,remark){
                this.$router.push({path:"assetsedit",query:{id,name,type,remark}})
            },
            showPopup:function(id){
                this.delId = id;
                this.show=true;
            },
            delAccount:function(){
                 this.$toast.loading({
                    mask: true,
                    message: '加载中...'
                });
                if(this.delId!="")
                {
                    axios.post(this.GLOBAL_.apiUrl+`api/account/delete?id=${this.delId}&token=${this.token}`).then(
                        res=>{
                            if(res.data.code==0){
                                this.waitPush(this,"删除成功","none")
                                this.show=false;                        
                                setTimeout(()=>{
                                    this.getAccount(this.token);        
                                },this.GLOBAL_.waittime)
                               
                            }else{
                                this.$toast.fail(res.data.data)
                            }
                            
                        }
                    )
                }
            },
            goToUrl:function(url){
                this.$router.push(url)
            }
        },
        components:{
            inputBox,
            msgBox
        }
    }
</script>


<style lang="less" scoped>
    @import "../../../node_modules/vant/lib/index.css";
    @import "../../css/public.less";
    @import "../../css/const.less";
    .box{
        margin-top:@marginTop;
        .cateType{
            border-bottom:1px solid #eee;
            margin:0 auto;
        }
        .in{
            color:red;
        }
        .assetsMangeBox{
            position:fixed;
            bottom:0em;
            width:100%;
            height:4em;
            background:#fff;
            .assetsMangeBtn{
                margin-top:1em;
            }
        }
    }
</style>