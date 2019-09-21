<template>
    <div class="backBox">
            --<slot></slot>--
    </div>
</template>

<script>

</script>

<style lang="less">
    @import "../../css/public.less";

    .backBox{
        background:@back;
        width:100%;
        height:2em;
        text-align: center;
        line-height: 2em;
        color:#666;
    }
</style>