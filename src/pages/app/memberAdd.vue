<template>
    <div class="addMemberBox">
       <input type="text" v-model="member" placeholder="请输入记账成员手机号" class="member">
        <div class="bottombase addMemberBtn" @click="addMember">
            添加成员
        </div>
    </div>
</template>

<script>
    import  axios from "axios";
    import qs from "qs";

    export default{
        data(){
            return {
                token:"",
                member:""
            }
        },
        mounted(){
             this.token = localStorage.getItem("accessToken");
        },
        methods:{   
           addMember:function(){
               if(this.member==""){
                   this.$toast("请输入手机号")
               }
               else if(!/^\d{11}$/.test(this.member))
               {
                   this.$toast("请检查手机格式")
               }
               else{
                    this.$toast.loading({
                            mask: true,
                            message: '加载中...'
                        });
                    let params={
                            book_id:this.$route.query.id,
                            mobile:this.member
                    }
                    axios.post(this.GLOBAL_.apiUrl+`api/member/add?token=${this.token}`,qs.stringify(params)).then(
                        res=>{
                            if(res.data.code==0){
                                this.waitPush(this,"添加成功","memberMange")
                            }
                            else{
                                this.$toast.fail(res.data.data);
                            }
                        }
                    )
               }
           }
        }
    }
</script>


<style lang="less" scoped>
    @import "../../css/public.less";
    @import "../../css/const.less";

    .addMemberBox{
        margin-top:@marginTop;
        .member{
            width:100%;
            outline:none;
            box-sizing: border-box;
            padding:0.5em;
            height:3em;
        }
    }

    .addMemberBtn{
        margin-top:1em;
    }

    
</style>