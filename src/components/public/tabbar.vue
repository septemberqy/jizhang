<template>
    <div class="tabbar">
        <slot></slot>
    </div>
</template>

<script>

</script>

<style lang="less" scoped>
    .tabbar{
        width:100%;
        height:3em;
        position:absolute;
        bottom:0;
        display:flex;
        flex-direction: row;
        justify-content: space-around;
    }
</style>