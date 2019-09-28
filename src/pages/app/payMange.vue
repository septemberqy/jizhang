<template>
    <div class="box">
        <van-swipe-cell  v-for="(item,index) in categroyData" :key=index >
            <van-cell :border="false" :title=item.name />
            <template slot="right">
                <van-button square type="primary" text="编辑" @click="goToUrl('payedit',item.name,item.id)" />
                <van-button square type="danger" text="删除" @click="showPopup(item.id)"/>
            </template>
        </van-swipe-cell>
        <div class="space"> </div>
        <div class="btnBox">
            <div class="payMangeBtn bottombase" @click="goToUrl('payadd')" v-if="this.categroyData!=''">
                            添加支出类别
            </div>
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


<style lang="less" scoped>
    @import "../../../node_modules/vant/lib/index.css";
    @import "../../css/public.less";
    @import "../../css/const.less";

    .box{
        margin-top:@marginTop;
    }
    .van-swipe-cell {
        margin:0 auto;
        border-bottom:1px solid #eee;
    }

    .btnBox{
        position:fixed;
        bottom:0em;
        width:100%;
        height:4em;
        background:#fff;
         .payMangeBtn{
            margin-top:0.5em;
        }
    }
   
    .space{
        height:4em;
    }
</style>

<script>
    import inputBox from "../../components/remember/inputDetail";
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
                  this.$toast.loading({
                    mask: true,
                    message: '加载中...'
                });
                this.categroy = []
                axios.get(this.GLOBAL_.apiUrl+"api/category?token="+token+"&type=2").then(
                    res=>{
                        if(res.data.code==0){
                            this.$toast.clear();
                            this.categroyData = res.data.data
                        }
                        else{
                            this.$toast.fail(res.data.data);
                        }
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
                this.$toast.loading({
                    mask: true,
                    message: '加载中...'
                });
                axios.post(this.GLOBAL_.apiUrl+`api/category/delete?id=${this.id}&token=${this.token}`).then(
                    res=>{
                        if(res.data.code==0){
                            this.$toast.success("删除成功");
                            this.show=false;

                            setTimeout(()=>{
                                 this.getCategroy(this.token);
                            },1500)
                        }else{
                            this.$toast.fail(res.data.data);
                        }
                    }
                )
            }
        }
    }
</script>