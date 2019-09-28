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
                if(this.content==""){
                    this.$toast("请输入意见")
                }
                else{
                    this.$toast.loading({
                        mask: true,
                        message: '加载中...'
                    });
                    let params={
                        content:this.content,
                        contact:this.contact
                    }
                    axios.post(this.GLOBAL_.apiUrl+`api/feedback/add?token=${this.token}`,qs.stringify(params)).then(
                        res=>{
                            if(res.data.code==0){
                                this.waitPush(this,res.data.data,"me")

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

    .idelBox{
        margin-top:@marginTop;
        box-sizing: border-box;
        .idel{
            width:100%;
            resize: none;
            height:8em;
            box-sizing: border-box;
            outline:none;
            border:0;
            // border-bottom:1px solid #eee;
        }
        .idelInput{
            width:100%;
            box-sizing: border-box;
            height:3em;
            outline:none;
            border:0;
            border-bottom:1px solid #eee;
        }
        .bookBtn{
            margin-top:1em;
        }
    }
</style>