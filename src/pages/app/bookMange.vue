<template>
    <div class="bookmangeBox">
        <van-swipe-cell  v-for="(item,index) in books" :key=index>
            <van-cell :border="false" :title="item.name+` (创建者${item.user_name})`" :value="getDefault(item.id)" value-class="bbInputBox" title-class="bbInputBox"/>
            <template slot="right">
                <van-button square type="primary" text="切换" v-if="defaultId!=item.id" @click="changeBook(item.id)"/>
                <van-button square type="warning" text="编辑" @click="goToUrl('bookedit','update',item.id,item.name)" />
                <van-button square type="danger" text="删除" @click="showMsgBox(item.id)"/>
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
    import inputBox from "../../components/remember/input-detail";
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
                let params={
                    book_id:id
                }
                axios.post(this.GLOBAL_.apiUrl+`api/book/set-default?token=${this.token}`,qs.stringify(params)).then(
                    res=>{
                        if(res.data.status){
                            this.$toast("更换成功");
                            this.getBook();
                        }
                        else{
                            this.$toast(res.data.data)
                        }
                    }
                )
            },
            delBook:function(){
                let params={
                    book_id:this.delId
                }
                axios.post(this.GLOBAL_.apiUrl+`api/book/delete?token=${this.token}`,qs.stringify(params)).then(
                     res=>{
                            if(res.data.status==false){
                                    this.$toast(res.data.data)
                            }else{
                                this.getBook();
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
                axios.get(this.GLOBAL_.apiUrl+`api/book?token=${this.token}`).then(
                    res=>{
                        console.log(res)
                        this.books=res.data.data;
                        
                    }
                ).then(
                    axios.get(this.GLOBAL_.apiUrl+`api/book/get-default?token=${this.token}`).then(
                        res=>{
                            this.defaultId=res.data.data.id;
                            
                        }
                    )
                )
            },
            getDefault:function(itemId){
                if(itemId==this.defaultId){
                    console.log(itemId,this.defaultId);
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

<style lang="less">
    @import "../../../node_modules/vant/lib/index.less";

    .bookmangeBox{
        margin-top:5em;
        .bookBtn{
            margin-top:1em;
        }
    }
    .bbInputBox{
        border-bottom:1px solid #eee;
        height:3em;
        padding:0.5em;
        box-sizing: border-box;
        font-size:16px;
        white-space: nowrap
    }
</style>