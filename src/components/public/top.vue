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
                this.$router.go(-1);
            }
        }
    }
</script> 

<style lang="less">
    @import "../../css/public.less";

    .top{
        width:100%;
        position:absolute;
        top:0;
        height:4em;
        background:@background;
        text-align: center;
        line-height: 4em;
        font-size:20px;
        color:#fff;
        font-weight: blod;
        img{
            width:1em;
            height:1em;
            position: absolute;
            top:1.5em;
            left:2em;
        }
    }
</style>