<template>
    <div class="meBox">
        <inputBox id="personalData">
            <span slot="icon" class="base ">
                <img :src="personal.avatar_url" class="infoIcon" >
            </span>
            <div slot="deco" class="base info">
                <span>{{personal.nickname}}</span>
                <span>{{personal.mobile}}</span>
            </div>
                <span slot="input" class="base">
                        <img src="../../assets/images/right.png">
                </span>
        </inputBox>
        <div class="bak"></div>
        <inputBox id="set">
            <span slot="icon" class="base">
                <img src="../../assets/images/set.png"  class="bigIcon">
            </span>
            <span slot="deco" class="base">设置</span>
                <span slot="input" class="base">
                        <img src="../../assets/images/right.png">
                </span>
        </inputBox>
        <inputBox id="bookmange">
            <span slot="icon" class="base">
                <img src="../../assets/images/book.png"  class="bigIcon">
            </span>
            <span slot="deco" class="base">账本管理</span>
                <span slot="input" class="base">
                        <img src="../../assets/images/right.png">
                </span>
        </inputBox>
        <inputBox id="idel">
            <span slot="icon" class="base">
                <img src="../../assets/images/message.png"  class="bigIcon">
            </span>
            <span slot="deco" class="base">意见反馈</span>
                <span slot="input" class="base">
                        <img src="../../assets/images/right.png">
                </span>
        </inputBox>
    </div>
</template>

<script>
    import inputBox from "../../components/remember/inputDetail";
    import axios from "axios";
    import qs from "qs";

    export default{
        data(){
            return {
                token:"",
                personal:"",
                showPhone:""
            }
        },
        components:{
            inputBox
        },
        mounted(){
            this.token = localStorage.getItem("accessToken");

            this.getInfo();
            if(this.personal!=""){
                // this.showPhone = this.personal.mobile.split("");
            }
        },
        methods:{
            getInfo:function(){
                this.$toast.loading({
                    mask: true,
                    message: '加载中...'
                });
                axios.get(this.GLOBAL_.apiUrl+`api/user/profile?token=${this.token}`).then(
                    res=>{
                        if(res.data.code==0){
                            this.$toast.clear();
                            this.personal = res.data.data;
                            let m =  this.personal.mobile.split("");
                            m.splice(3,4,'****').join("");
                            this.personal.mobile = m.join("")
                        }
                        else{
                            this.$toast.fail(res.data.data);
                        }
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
    .meBox{
        margin-top:@marginTop;

    }
</style>