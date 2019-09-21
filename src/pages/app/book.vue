<template>
    <div class="box">
        <titleCell></titleCell>
        <inputBox id="assetsmange">
            <span slot="icon" class="base icon">
                <img src="../../assets/images/icon_money.png"  >
            </span>
            <span slot="deco" class="base">资产账户</span>
                <span slot="input" class="base">
                        <img src="../../assets/images/right.png">
                </span>
        </inputBox>
        <titleCell></titleCell>
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
        <titleCell></titleCell>
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
    import inputBox from "../../components/remember/input-detail";
    import titleCell from "../../components/public/titil-cell"
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

<style lang="less">
    .box{
        margin-top:5em;
    }
</style>