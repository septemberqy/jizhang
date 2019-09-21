<template>
    <div class="setBox">
            <div class="bak"></div>
            <inputBox id="setpassword">
                <span slot="icon" class="base ">
                    <img src="../../assets/images/lock.png" class="bigIcon" >
                </span>
                <span slot="deco" class="base">修改密码</span>
                <span slot="input" class="base">
                          <span slot="input" class="base">
                          <img src="../../assets/images/right.png">
                        </span>
                </span>
            </inputBox>
             <inputBox  id="newphone">
                <span slot="icon" class="base">
                    <img src="../../assets/images/phone.png" class="bigIcon" >
                </span>
                <span slot="deco" class="base">更换手机号码</span>
                <span slot="input" class="base">
                          <span slot="input" class="base">
                          <img src="../../assets/images/right.png">
                        </span>
                </span>
            </inputBox>
            <div class="bak"></div>
            <div class="bottombase loginBtn" @click="loginOut">
                退出登陆
            </div>
    </div>
</template>

<script>
    import inputBox from "../../components/remember/input-detail";
     import  axios from "axios";
    import qs from "qs";
    export default{
        data(){
            return {
                token:""
            }
        },
        mounted(){
            this.token = localStorage.getItem("accessToken");
        },
        components:{
            inputBox
        },
        methods:{
            loginOut:function(){
                axios.get(this.GLOBAL_.apiUrl+`api/user/logout?token=${this.token}`).then(
                    res=>{
                       if(res.data.code==0){
                           this.$toast("退出成功");
                           localStorage.removeItem("accessToken","");
                           this.$router.push('login');
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

    .setBox{
        margin-top:5em;
    }
    .loginBtn{
        margin-top:1em;
    }
</style>