<template>
    <div class="box">
        <van-swipe-cell  v-for="(item,index) in account" :key=index>
            <van-cell :border="false" :title=item.name :value=item.balance value-class="in"/>
            <template slot="right">
                <van-button square type="primary" text="编辑" @click="assetsedit(item.id,item.name,item.type)"/>
                <van-button square type="danger" text="删除" @click="showPopup(item.id)"/>
            </template>
        </van-swipe-cell>
        <div class="addBottom bottombase" @click="goToUrl('assetsadd')" v-if="this.account!=''">
                        添加资产账户
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
    import inputBox from "../../components/remember/input-detail";
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
                axios.get(this.GLOBAL_.apiUrl+"api/account?token="+this.token).then(
                    res=>{
                        this.account = res.data.data;
                    }
                )
            },
            assetsedit:function(id,name,type){
                this.$router.push({path:"assetsedit",query:{id,name,type}})
            },
            showPopup:function(id){
                this.delId = id;
                this.show=true;
            },
            delAccount:function(){
                if(this.delId!="")
                {
                    axios.post(this.GLOBAL_.apiUrl+`api/account/delete?id=${this.delId}&token=${this.token}`).then(
                        res=>{
                            if(res.data.code==0){
                                this.getAccount(this.token);
                                this.show=false;
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

<style lang="less">
    @import "../../../node_modules/vant/lib/index.less";
    @import "../../css/public.less";

    .box{
        margin-top:5em;
        .in{
            color:red;
        }
    }

   

    
</style>