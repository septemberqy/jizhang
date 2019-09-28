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
    import inputBox from "../../components/remember/inputDetail";
    import axios from "axios";
    import qs from "qs";
    export default{
        methods:{
            updateNickname:function(){
                if(this.name==""){
                    this.$toast("请输入昵称")
                }
                else{
                    this.$toast.loading({
                        mask: true,
                        message: '加载中...'
                    });
                    let params ={
                        nickname:this.name
                    }
                    axios.post(this.GLOBAL_.apiUrl+`api/user/profile/update?token=${this.token}`,qs.stringify(params)).then(
                        res=>{
                            if(res.data.code==0){
                                this.waitPush(this,"修改成功","personaldata")
                            }
                            else{
                                this.$toast.fail(res.data.data);
                            }
                        }
                    )
                }
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


<style lang="less" scoped>
      @import "../../css/public.less";
    @import "../../../node_modules/vant/lib/index.css";
    @import "../../css/const.less";

    .nicknameBox{
        margin-top:@marginTop;
    }

</style>