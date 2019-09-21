<template>
    <div class="nicknameBox">
        <div class="bak">
            请输入新的昵称
        </div>
        <inputBox>
                <span slot="deco" class="base">昵称</span>
                <span slot="input" class="base">
                         <input type="text" name="name" slot="input" v-model=name autofocus="autofocus" placeholder="请输入新的昵称">
                </span>
            </inputBox>
            <div class="addBottom bottombase" @click="updateNickname">
                    确认修改
            </div>
    </div>
</template>

<script>
    import inputBox from "../../components/remember/input-detail";
    import axios from "axios";
    import qs from "qs";
    export default{
        methods:{
            updateNickname:function(){
                let params ={
                    nickname:this.name
                }
                axios.post(this.GLOBAL_.apiUrl+`api/user/profile/update?token=${this.token}`,qs.stringify(params)).then(
                    res=>{
                        if(res.data.code==0){
                            this.$toast(res.data.data);
                            this.$router.go(-1);
                        }
                        else{
                            this.$toast(res.data.data);
                        }
                    }
                )
            }
        },
        components:{
            inputBox
        },
        data(){
            return {
                name:""
            }
        },
        mounted(){
            this.token = localStorage.getItem("accessToken");

            this.name=this.$route.query.name;
        }
    }
</script>

<style lang="less">
    @import "../../css/public.less";
    @import "../../../node_modules/vant/lib/index.less";

    .nicknameBox{
        margin-top:5em;
    }

</style>