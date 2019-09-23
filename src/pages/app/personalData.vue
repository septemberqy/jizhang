<template>
    <div class="personalBox">
         <inputBox>
            <span slot="deco" class="base">头像</span>
                <span slot="input" class="base">
        
                         <van-uploader   :after-read="afterRead" name="file">
                            <img :src=personal.avatar_url class="infoIcon">
                        </van-uploader>
                       
                </span>
        </inputBox>
        <inputBox id="newnickname" :querys='{name:personal.nickname}'>
            <span slot="deco" class="base">昵称</span>
                <span slot="input" class="base">
                        {{personal.nickname}}
                        <img src="../../assets/images/right.png">
                </span>
        </inputBox>
        <inputBox id="newPhone">
            <span slot="deco" class="base">手机号</span>
                <span slot="input" class="base">
                        {{personal.showmobile}}
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
            afterRead:function(file){
                let fd = new FormData();
                let key="";
                fd.append('file', file.file)
                axios.post(this.GLOBAL_.apiUrl+`api/upload/image?token=${this.token}`,fd,{headers: {
                     'Content-Type': 'multipart/form-data'
                }}).then(
                    res=>{
                        key = res.data.data.file.fileKey;
                        let params={
                            avatar:key
                        }
                        axios.post(this.GLOBAL_.apiUrl+`api/user/profile/update?token=${this.token}`,qs.stringify(params)).then(
                            res=>{
                                if(res.data.code==0){
                                    this.$toast(res.data.data);
                                    this.getInfo();
                                }
                            }
                        )
                    }
                )
            },
            getInfo:function(){
                axios.get(this.GLOBAL_.apiUrl+`api/user/profile?token=${this.token}`).then(
                    res=>{
                        if(res.data.code==0){
                            this.personal = res.data.data;
                            let m =  this.personal.mobile.split("");
                            m.splice(3,4,'****').join("");
                            this.personal.showmobile = m.join("")
                            
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

    .personalBox{
        margin-top:5em;
    }
</style>