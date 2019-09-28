<template>
    <div class="passwordBox">
        <div class="bak"></div>
        <input type="password" v-model=oldPwd placeholder="请输入旧密码" class="pwdInput">
        <input type="password" v-model=newPwd placeholder="请输入新密码" class="pwdInput">
        <input type="password" v-model=newPwd2 placeholder="请再次输入新密码" class="pwdInput">
        <div class="bak"></div>

        <button class="updateBtn" @click="updatePwd">确认修改</button>

    </div>
</template>

<script>
    import axios from "axios";
    import qs from "qs";

    export default{
        data(){
            return {
                token:"",
                oldPwd:"",
                newPwd:"",
                newPwd2:""
            }
        },
        mounted(){
            this.token = localStorage.getItem("accessToken");

        },
        methods:{
            updatePwd:function(){
                 this.$toast.loading({
                    mask: true,
                    message: '加载中...'
                });
                if(this.newPwd==this.newPwd2){
                    let params={
                        password:this.oldPwd,
                        new_password:this.newPwd
                    };
                    axios.post(this.GLOBAL_.apiUrl+`api/user/password?token=${this.token}`,qs.stringify(params)).then(
                        res=>{
                            if(res.data.code==0){
                                this.waitPush(this,res.data.data,"set")
                               
                            }
                            else{
                                this.$toast.fail(res.data.data);
                                this.oldPwd=this.newPwd=this.newPwd2="";
                            }
                        }
                    )
                }
                else{
                    this.$toast("两次密码不一致");
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "../../css/public.less";
    @import "../../../node_modules/vant/lib/index.css";
    @import "../../css/const.less";

    .passwordBox{
        margin-top:@marginTop;
        display:flex;
        flex-direction: column;
        .pwdInput{
            width:100%;
            height:4em;
            padding:0.5em;
            box-sizing: border-box;
            border:none;
            outline:none;
            border-top:1px solid #eee;
            border-bottom:1px solid #eee;
            font-size:16px;
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