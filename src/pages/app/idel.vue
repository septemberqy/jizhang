<template>
    <div class="idelBox">
        <div class="bak">问题和建议</div>
        <textarea class="idel" placeholder="请简要描述您的建议和问题" v-model="content"></textarea>
         <div class="bak">联系电话或邮箱</div>
        <input type="text" class="idelInput" placeholder="选填,方便我们与您取得联系" v-model="contact">
        <div class="bottombase bookBtn" @click="addIdel">
            提交意见
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    import qs from "qs";

    export default{
        data(){
            return {
                token:"",
                content:"",
                contact:""
            }
        },
        mounted(){
            this.token = localStorage.getItem("accessToken");

        },
        methods:{
            addIdel:function(){
                let params={
                    content:this.content,
                    contact:this.contact
                }
                axios.post(this.GLOBAL_.apiUrl+`api/feedback/add?token=${this.token}`,qs.stringify(params)).then(
                    res=>{
                        if(res.data.code==0){
                            this.$toast(res.data.data);
                            this.$router.push('me');
                        }
                    }
                )
            }
        }
    }
</script>

<style lang="less">
    @import "../../css/public.less";

    .idelBox{
        margin-top:5em;
        .idel{
            width:100%;
            resize: none;
            height:8em;
            box-sizing: border-box;
            outline:none;
        }
        .idelInput{
            width:100%;
            box-sizing: border-box;
            height:2em;
            outline:none;
        }
        .bookBtn{
            margin-top:1em;
        }
    }
</style>