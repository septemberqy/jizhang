<template>
    <div class="bookmangeBox">
        <van-swipe-cell  v-for="(item,index) in books" :key=index class="cateType">
            <van-cell :border="false" :title="item.name+` (创建者${item.user_name})`" :value="getDefault(item.id)" />
            <template slot="right">
                <van-button square type="primary" text="切换" :disabled="defaultId==item.id" @click="changeBook(item.id)"/>
                <van-button square type="warning" text="编辑" @click="goToUrl('bookedit','update',item.id,item.name)" />
                <van-button square type="danger" text="删除" @click="showMsgBox(item.id)" />
            </template>
        </van-swipe-cell>
        <van-popup v-model="show">
            <msgBox>
                <div class="cancel chose" @click="show=false" slot="cancel">取消</div>
                <div class="del chose" slot="del" @click="delBook">删除</div>
            </msgBox>
        </van-popup>
        <div class="bottombase bookBtn" @click="goToUrl('bookedit','new')">
                创建账簿
        </div>
    </div>
</template>

<script>
    import inputBox from "../../components/remember/inputDetail";
    import axios from "axios";
    import qs from  "qs";
   
    import msgBox from "../../components/public/mesBox";

    export default{
        data(){
            return {
                token:"",
                books:"",
                defaultId:"",
                show:false,
                delId:""
            }
        },
        components:{
            inputBox,
            msgBox
        },
        mounted(){
             this.token = localStorage.getItem("accessToken");
            this.getBook();
        },
        methods:{
            changeBook:function(id){
                 this.$toast.loading({
                        mask: true,
                        message: '加载中...'
                    });
                let params={
                    book_id:id
                }
                axios.post(this.GLOBAL_.apiUrl+`api/book/set-default?token=${this.token}`,qs.stringify(params)).then(
                    res=>{
                        if(res.data.status){
                            this.waitPush(this,"更换成功","none")
                            setTimeout(()=>{
                            this.getBook();                                
                            },this.GLOBAL_.waittime)
                        }
                        else{
                            this.$toast.fail(res.data.data)
                        }
                    }
                )
            },
            delBook:function(){
                 this.$toast.loading({
                    mask: true,
                    message: '加载中...'
                });
                let params={
                    book_id:this.delId
                }
                axios.post(this.GLOBAL_.apiUrl+`api/book/delete?token=${this.token}`,qs.stringify(params)).then(
                     res=>{
                            if(res.data.status==false){
                                    this.$toast.fail(res.data.data)
                            }else{
                                this.waitPush(this,"删除成功","none");
                                setTimeout(()=>{
                                    this.getBook();
                                },this.GLOBAL_.waittime)
                            }
                            this.show=false;
                    }
                )
                   
                
            },
            showMsgBox:function(id){
                this.show=true;
                this.delId = id;
            },
            getBook:function(){
                this.$toast.loading({
                    mask: true,
                    message: '加载中...'
                });
                axios.get(this.GLOBAL_.apiUrl+`api/book?token=${this.token}`).then(
                    res=>{
                        if(res.data.code==0){
                            
                            this.books=res.data.data;
                        }
                        else{
                            this.$toast.fail(res.data.data)
                        }
                        
                    }
                ).then(
                    axios.get(this.GLOBAL_.apiUrl+`api/book/get-default?token=${this.token}`).then(
                        res=>{
                            if(res.data.code==0){
                                this.$toast.clear();
                                this.defaultId=res.data.data.id;
                            }
                            else{
                                this.$toast.fail(res.data.data)
                            }
                            
                        }
                    )
                )
            },
            getDefault:function(itemId){
                if(itemId==this.defaultId){
                    return "当前账簿"
                }
            },
            goToUrl:function(url,act,id,name){
                if(id!=undefined && name!=undefined){
                    this.$router.push({path:url,query:{act,id,name}})
                }
                else if(act=="new"){
                   this.$router.push({path:url,query:{act}})
                }
            }

        }
    }
</script>


<style lang="less" scoped>
    @import "../../../node_modules/vant/lib/index.css";
    @import "../../css/public.less";
    @import "../../css/const.less";

    .bookmangeBox{
        margin-top:@marginTop;
        .bookBtn{
            margin-top:1em;
        }
        .cateType{
            border-bottom:1px solid #eee;
            margin:0 auto;
        }
        .van-cell__title{
            font-size:16px;
            color:#666;
            width:80%;
            white-space: nowrap;
            overflow: hidden;
        }
    }
    .bbInputBox{
        border-bottom:1px solid #eee;
        height:3em;
        padding:0.5em;
        box-sizing: border-box;
        font-size:16px;
        white-space: nowrap;
         
    }
</style>