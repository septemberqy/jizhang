<template>
    <div>
        <div class="registbox">
            <input type="text" name="mobile" id="mobile" placeholder="手机号" v-model="mobile" maxlength="11">
            <div class="vimgbox">
                <input type="text" name="vimgcode" id="vimgcode" placeholder="图形验证码" v-model="vimgcode">
                <img :src=vimg @click="getImg">
            </div>
            <div class="vcodebox">
                <input type="text" name="vcode" id="vcode" placeholder="手机验证码" v-model="vcode">
                <button @click="getMsg" class="imgbtn">获得验证码</button>
            </div>
           
            <input type="password" name="pwd" id="pwd" placeholder="密码" v-model="pwd">
            <input type="text" name="nickname" id="nickname" placeholder="昵称"  v-model="nickname">
            <div class="errMsg">{{errMsg}}</div>
            <button class="btn" @click="regist">注册</button>
            <span class="back" @click="goToUrl('login')">返回登陆</span>
        </div>
        
    </div>
</template>

<script>
    import axios from "axios";
    import qs from "qs";
    export default{
        data(){
            return {
                vimg:"",
                vimgcode:"",
                vimgkey:"",
                mobile:"",
                vcode:"",
                vkey:"",
                pwd:"",
                nickname:"",
                errMsg:""
            }
        },
        mounted(){
            this.getImg();
        },
        methods:{
            goToUrl:function(url){
                this.$router.push(url);
            },
            getMsg:function(){
                axios.post(this.GLOBAL_.apiUrl+"api/sms/verify",
                qs.stringify({
                    mobile:this.mobile,
                    captcha_code:this.vimgcode,
                    captcha_key:this.vimgkey
                }),this.GLOBAL_.headers).then(res=>{
                    console.log(res);
                    if(res.data.code==0){
                          this.$toast(res.data.data);
                    }
                    else{
                            if(res.data.data=="INVALID_CAPTCHA")
                            {
                                this.$toast("图片验证码不正确");
                            }
                            else{
                                this.$toast(res.data.data);
                            }

                    }
                })
            },
            getImg:function(){
                axios.get(this.GLOBAL_.apiUrl+"api/captcha").then(res=>{
                    if(res.data.code==0){
                        this.vimg = res.data.data.url;
                        this.vimgkey = res.data.data.key;
                        this.vimgcode = "";
                        
                    }
                    else{
                        res.$toast(res.data.data)
                    }
                })
            },
            regist:function(){
                if(this.mobile==""){
                    this.$toast("请输入手机号");
                }
                else if(this.vimgcode==""){
                    this.$toast("请输入图片验证码");                    
                }
                else if(this.vimgcode==""){
                    this.$toast("请输入短信验证码");                    
                }
                else{
                    let param = {
                        mobile:this.mobile,
                        verify:this.vcode,
                        password:this.pwd,
                        nickname:this.nickname
                    }
                    axios.post(this.GLOBAL_.apiUrl+"api/user/register",qs.stringify(param),this.GLOBAL_.headers)
                    .then(res=>{
                        if(res.data.status==false){
                            this.$toast(res.data.data);
                            this.pwd="",
                            this.nickname="",
                            this.vcode = "",
                            this.getImg()
                        }
                        else{
                            localStorage.setItem("accessToken",res.data.data.token);
                            this.waitPush(this,"注册成功","finance")
                        }
                    })
                }
            }
        }
    }
</script>



<style lang="less" scoped>
    @import "../../css/login.less";
    @import "../../../node_modules/vant/lib/index.css";
    .back{
        text-align: center;
        color:#666;
    }
    .msg{
        display:none;
        position:fixed;
        top:0;
        bottom:0;
        left:0;
        right:0;
        background:rgba(0,0,0,0.5);
    }
</style>