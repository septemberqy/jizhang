<template>
    <div class="top">
            <div class="back" v-show=this.$route.meta.back>
                <a @click="goBack"><img src="../../assets/images/back.png"></a>
            </div>
            <slot name="title"></slot>
    </div>
</template>

<script>
    export default{
       
        methods:{
            goBack:function(){
                 let backUrl = this.$route.meta.backUrl==undefined?-1:this.$route.meta.backUrl;
                 if(backUrl==-1)
                 {
                    this.$router.go(backUrl);
                 }
                 else{
                    this.$router.push(backUrl);
                 }
            }
        }
    }
</script> 

<style lang="less" scoped>
    @import "../../css/public.less";

    .top{
        width:100%;
        position:absolute;
        top:0;
        height:2em;
        background:@background;
        text-align: center;
        line-height: 2em;
        font-size:20px;
        color:#fff;
        font-weight: blod;
        img{
            width:1em;
            height:1em;
            position: absolute;
            top:0.5em;
            left:2em;
        }
    }
</style>