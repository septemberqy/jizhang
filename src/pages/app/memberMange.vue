<template>
    <div class="memberMangeBox">
        <div class="bak" v-if="members.length==0">
            还没有成员
        </div>
        <van-swipe-cell  v-for="(item,index) in members" :key=index class="">
            <van-cell :border="false" :title=item.mobile />
            <template slot="right">
                <van-button square type="danger" text="删除" @click="showPopup(id,item.id)"/>
            </template>
        </van-swipe-cell>
        <van-popup v-model="show">
            <msgBox>
                <div class="cancel chose" @click="show=false" slot="cancel">取消</div>
                <div class="del chose"  @click="delMember" slot="del">删除</div>
            </msgBox>
        </van-popup>
        <div class="bottombase memberMangeBtn" @click="goToUrl('memberadd',id)">
            添加成员
        </div>
    </div>
</template>

<script>
    import  axios from "axios";
    import qs from "qs";
    import msgBox from "../../components/public/mesBox";

    export default{
        components:{
            msgBox
        },
        data(){
            return {
                token:"",
                id:"",
                members:"",
                show:false,
                user_id:""
            }
        },
        mounted(){
            this.token = localStorage.getItem("accessToken");

            this.getBook();
        },
        methods:{
            delMember:function(){
                let params={
                    book_id:this.id,
                    user_id:this.user_id
                }
                axios.post(this.GLOBAL_.apiUrl+`api/member/delete?token=${this.token}`,qs.stringify(params)).then(
                    res=>{
                        if(res.data.code==0){
                            this.show=false;
                            this.$toast(res.data.data)
                            this.getBook();
                        }
                        else{
                            this.$toast(res.data.data)

                        }
                    }
                )
            },
            showPopup:function(book_id,uid){
                this.show=true;
                this.user_id=uid;
            },
            goToUrl:function(url,id){
                this.$router.push({path:url,query:{id}});
            },
            getBook:function(){
                axios.get(this.GLOBAL_.apiUrl+`api/book/get-default?token=${this.token}`).then(
                    res=>{

                        this.id = res.data.data.id;
                        
                        axios.get(this.GLOBAL_.apiUrl+`api/member?token=${this.token}&book_id=${this.id}`).then(
                        res=>{
                            console.log(res);
                            this.members = res.data.data;
                        }
                        )
                    }
                )
            }
        }
    }
</script>

<style lang="less">
    @import "../../css/public.less";
    @import "../../../node_modules/vant/lib/index.less";

    .memberMangeBox{
        margin-top:5em;
    }
    .memberMangeBtn{
        margin-top:1em;
    }
</style>