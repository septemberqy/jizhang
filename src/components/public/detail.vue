<template>
    <div class="detail">
        <div class="left">
            <slot name="icon" v-show="hasIcon" ></slot>
            <slot name="text"></slot>
        </div>
        <div class="right">
            <slot name="price"></slot>
            <img src="../../assets/images/right.png" class="righticon">
        </div>
    </div>
</template>


<script>
    export default{
        props:{
            hasIcon:{
                type:Boolean,
                default:false
            }
        }
    }
</script>
<style lang="less" scoped>
    @import  "../../css/detail.less";
   
</style>