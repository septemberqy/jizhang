<template>
    <div class="box">
        <van-swipe-cell  v-for="(item,index) in categroyData" :key=index >
            <van-cell :border="false" :title=item.name />
            <template slot="right">
                <van-button square type="primary" text="编辑" @click="goToUrl('incomeedit',item.name,item.id)" />
                <van-button square type="danger" text="删除" @click="showPopup(item.id)"/>
            </template>
        </van-swipe-cell>
        <div class="addBottom bottombase" @click="goToUrl('payadd')" v-if="this.categroyData!=''">
                        添加支出类别
        </div>
        <van-popup v-model="show">
            <msgBox>
                <div class="cancel chose" @click="show=false" slot="cancel">取消</div>
                <div class="del chose"  @click="delCategroy" slot="del">删除</div>
            </msgBox>
        </van-popup>
        
        <!-- <inputBox v-for="(item,index) in categroyData" :key=index>
            <span slot="deco" class="base">{{item.name}}</span>
        </inputBox> -->
    </div>
</template>

<style lang="less">
    @import "../../../node_modules/vant/lib/index.less";

    .box{
        margin-top:5em;
    }
    .van-swipe-cell {
        margin:0 auto;
        border-bottom:1px solid #eee;
    }
    .addBottom{
        margin-top:2em!important;
    }
</style>

<script>
    import inputBox from "../../components/remember/input-detail";
    import msgBox from "../../components/public/mesBox";

    import axios from "axios";
    import qs from "qs";

    export default{
        data(){
            return {
                token:"",
                categroyData:"",
                show:false,
                id:""
            }
        },
        components:{
            inputBox,
            msgBox
        },
        mounted(){
            this.token = localStorage.getItem("accessToken");

            this.getCategroy(this.token)
        },
        methods:{
             getCategroy:function(token){
                this.categroy = []
                axios.get(this.GLOBAL_.apiUrl+"api/category?token="+token+"&type=2").then(
                    res=>{
                        this.categroyData = res.data.data
                    }
                )
            },
            goToUrl:function(url,name,id){
                this.$router.push({path:url,query:{id,name}});
            },
            showPopup:function(id){
                this.id=id;
                this.show=true;
            },
            delCategroy:function(){
                axios.post(this.GLOBAL_.apiUrl+`api/category/delete?id=${this.id}&token=${this.token}`).then(
                    res=>{
                        if(res.data.code==0){
                            this.$toast("删除成功");
                            this.getCategroy(this.token);
                            this.show=false;
                        }
                    }
                )
            }
        }
    }
</script>