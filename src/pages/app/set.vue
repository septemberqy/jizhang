<template>
    <div class="setBox">
            <inputBox id="setpassword">
                <span slot="icon" class="base ">
                    <img src="../../assets/images/lock.png" class="bigIcon" >
                </span>
                <span slot="deco" class="base">修改密码</span>
                <span slot="input" class="base">
                          <span slot="input" class="base">
                          <img src="../../assets/images/right.png">
                        </span>
                </span>
            </inputBox>
             <inputBox  id="newphone">
                <span slot="icon" class="base">
                    <img src="../../assets/images/phone.png" class="bigIcon" >
                </span>
                <span slot="deco" class="base">更换手机号码</span>
                <span slot="input" class="base">
                          <span slot="input" class="base">
                          <img src="../../assets/images/right.png">
                        </span>
                </span>
            </inputBox>
            
    </div>
</template>

<script>
    import inputBox from "../../components/remember/inputDetail";
     import  axios from "axios";
    import qs from "qs";
    export default{
        data(){
            return {
                token:""
            }
        },
        mounted(){
            this.token = localStorage.getItem("accessToken");
        },
        components:{
            inputBox
        },
        methods:{
            
        }
    }
</script>


<style lang="less" scoped>
    @import "../../css/public.less";
    @import "../../../node_modules/vant/lib/index.css";
    @import "../../css/const.less";

    .setBox{
        margin-top:@marginTop;
    }
    .loginBtn{
        margin-top:1em;
    }
</style>