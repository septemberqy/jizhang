<template>
    <div class="box">
        <inputBox id="assetsmange">
            <span slot="icon" class="base icon">
                <img src="../../assets/images/icon_money.png"  >
            </span>
            <span slot="deco" class="base">资产账户</span>
                <span slot="input" class="base">
                        <img src="../../assets/images/right.png">
                </span>
        </inputBox>
        <inputBox id="incomemange">
            <span slot="icon" class="base icon">
                <img src="../../assets/images/icon_in.png"  >
            </span>
            <span slot="deco" class="base">收入类别</span>
                <span slot="input" class="base">
                        <img src="../../assets/images/right.png">
                </span>
        </inputBox>
        <inputBox id="paymange">
            <span slot="icon" class="base icon">
                <img src="../../assets/images/icon_out.png"  >
            </span>
            <span slot="deco" class="base">支出类别</span>
                <span slot="input" class="base">
                        <img src="../../assets/images/right.png">
                </span>
        </inputBox>
        <inputBox id="membermange">
            <span slot="icon" class="base icon">
                <img src="../../assets/images/icon_member.png"  >
            </span>
            <span slot="deco" class="base">记账成员</span>
                <span slot="input" class="base">
                        <img src="../../assets/images/right.png">
                </span>
        </inputBox>
    </div>
</template>

<script>
    import inputBox from "../../components/remember/inputDetail";
    import titleCell from "../../components/public/titilCell"
    export default{
        components:{
            inputBox,
            titleCell
        },
        methods:{
            goToUrl:function(url){
                this.$router.push(url);
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "../../css/const.less";

    .box{
        margin-top:@marginTop;
    }
</style>