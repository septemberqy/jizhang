<template>
    <div class="memberMangeBox">
        <div class="bak" v-if="members.length==0">
            还没有成员
        </div>
        <van-swipe-cell  v-for="(item,index) in members" :key=index class="cateType">
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
                this.$toast.loading({
                    mask: true,
                    message: '加载中...'
                });
                let params={
                    book_id:this.id,
                    user_id:this.user_id
                }
                axios.post(this.GLOBAL_.apiUrl+`api/member/delete?token=${this.token}`,qs.stringify(params)).then(
                    res=>{
                        if(res.data.code==0){
                            this.show=false;
                            this.waitPush(this,"删除成功","none");
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
            showPopup:function(book_id,uid){
                this.show=true;
                this.user_id=uid;
            },
            goToUrl:function(url,id){
                this.$router.push({path:url,query:{id}});
            },
            getBook:function(){
                this.$toast.loading({
                    mask: true,
                    message: '加载中...'
                });
                axios.get(this.GLOBAL_.apiUrl+`api/book/get-default?token=${this.token}`).then(
                    res=>{
                        this.id = res.data.data.id;
                        axios.get(this.GLOBAL_.apiUrl+`api/member?token=${this.token}&book_id=${this.id}`).then(
                        res=>{
                            if(res.data.code==0)
                            {
                                this.$toast.clear();
                                this.members = res.data.data;
                            }
                            else{
                                this.$toast.fail(res.data.data);
                            }
                        }
                        )
                    }
                )
            }
        }
    }
</script>


<style lang="less" scoped>
    @import "../../css/public.less";
    @import "../../../node_modules/vant/lib/index.css";
    @import "../../css/const.less";

    .memberMangeBox{
        margin-top:@marginTop;
        .cateType{
            border-bottom:1px solid #eee;
            margin:0 auto;
        }
    }
    .memberMangeBtn{
        margin-top:1em;
    }
</style>