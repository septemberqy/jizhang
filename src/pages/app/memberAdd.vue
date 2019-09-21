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
               let params={
                    book_id:this.$route.query.id,
                    mobile:this.member
               }
               axios.post(this.GLOBAL_.apiUrl+`api/member/add?token=${this.token}`,qs.stringify(params)).then(
                   res=>{
                       console.log(res);
                       if(res.data.code==0){
                           this.$toast("添加成功");
                           this.$router.push('memberMange');
                       }
                       else{
                           this.$toast(res.data.data);
                           
                       }
                   }
               )
           }
        }
    }
</script>

<style lang="less">
    @import "../../css/public.less";

    .addMemberBox{
        margin-top:5em;
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