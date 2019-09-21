<template>
    <div class="resetPwdbox">
            <input type="text" name="newPhone" v-model=newPhone placeholder="请输入手机号">
            <div class="yzmbox">
                <input type="text" name="yzm" v-model=yzm placeholder="请输入验证码" class="yzm" >
                <button class="yzmbtn"  @click="showPopup">获取验证码</button>
            </div>
             <input type="password" name="password" v-model=password placeholder="请输入密码">
            <van-popup v-model="show">
                <yzmBox>
                    <span slot="title" class="title">请输入手机验证码</span>
                    <img :src='img' slot="img" class="yzmimg">
                    <input type="text" slot="input" class="yzminput" placeholder="输入验证码" v-model=imgyzm>
                    <span slot="btnValue" class="yzmBtn" @click="getSms">确定</span>
                </yzmBox>
            </van-popup>
            <button class="updateBtn" @click="updatePwd">提交</button>
    </div>
    
</template>

<script>
    import yzmBox from "../../components/public/yzm";
    import axios from "axios";
    import qs from "qs";

    export default{
        data(){
            return {
                token:"",
                newPhone:"",
                password:"",
                yzm:"",
                show:false,
                img:"",
                key:"",
                imgyzm:""
            }
        },
        components:{
            yzmBox
        },
        mounted(){
            this.token = localStorage.getItem("accessToken");
            
        },
        methods:{
            updatePwd:function(){
                let params={
                    password :this.password,
                    mobile:this.newPhone,
                    verify:this.yzm
                }

                axios.post(this.GLOBAL_.apiUrl+`api/user/token/sms`,qs.stringify(params)).then(
                    res=>{
                        if(res.data.status){
                            this.$toast("更改成功");
                            localStorage.setItem("accessToken",res.data.data.token);		
                            this.$router.push("/finance");
                        }
                        else{
                             this.$toast(res.data.data);
                        }
                    }
                )
                    
                
            },
            getSms:function(){
                let params={
                    mobile:this.newPhone,
                    captcha_code:this.imgyzm,
                    captcha_key:this.key
                }
                axios.post(this.GLOBAL_.apiUrl+`api/sms/verify`,qs.stringify(params)).then(
                    res=>{
                        if(res.data.code==0){
                            console.log(res);
                            this.imgyzm="";
                            this.show=false;
                        }
                        else{
                            this.$toast(res.data.data);
                        }
                    }
                )
            },
            showPopup:function(){
                if(this.newPhone==""){
                    this.$toast("手机格式不正确");
                }
                else{
                    axios.get(this.GLOBAL_.apiUrl+"api/captcha").then(
                        res=>{
                            this.img = res.data.data.url;
                            this.key =res.data.data.key;
                            this.show=true;
                        }
                    )
                    
                }
            },
            
        }
    }
</script>

<style lang="less">
@import "../../css/public.less";
    @import "../../../node_modules/vant/lib/index.less";
    .resetPwdbox{
        margin-top:5em;
    }
    input{
        width:100%;
        padding:0.5em;
        height:4em;
        box-sizing: border-box;
        border:0px;
        outline:none;
        border-bottom:1px solid #eee;
        border-top:1px solid #eee;
        font-size:16px;
    }
    .yzmbox{
        display:flex;
        flex-direction: row;
        .yzm{
            width:70%;
        }
        .yzmbtn{
            width:30%;
        }
    }
    .updateBtn{
        width:90%;
        height:3em;
        padding-top:0.5em;
        padding-bottom:0.5em;
        background:@background;
        color:#fff;
        border-radius: 10px;
        outline: none;
        margin:1em auto;
        border:0px;
        display:block;
    }
</style>