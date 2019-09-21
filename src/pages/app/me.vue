<template>
    <div class="meBox">
        <div class="bak"></div>
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
        <div class="bak"></div>
        <inputBox id="bookmange">
            <span slot="icon" class="base">
                <img src="../../assets/images/book.png"  class="bigIcon">
            </span>
            <span slot="deco" class="base">账本管理</span>
                <span slot="input" class="base">
                        <img src="../../assets/images/right.png">
                </span>
        </inputBox>
        <div class="bak"></div>
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
    import inputBox from "../../components/remember/input-detail";
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
                console.log(this.personal.mobile);
                // this.showPhone = this.personal.mobile.split("");
            }
        },
        methods:{
            getInfo:function(){
                axios.get(this.GLOBAL_.apiUrl+`api/user/profile?token=${this.token}`).then(
                    res=>{
                        if(res.data.code==0){
                            this.personal = res.data.data;
                            let m =  this.personal.mobile.split("");
                            m.splice(3,4,'****').join("");
                            this.personal.mobile = m.join("")
                            
                        }
                    }
                )
            }
        }
    }
</script>

<style lang="less">
    @import "../../css/public.less";
    @import "../../../node_modules/vant/lib/index.less";
    
    .meBox{
        margin-top:5em;

    }
</style>