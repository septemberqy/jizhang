<template>
    <div class="tabbar">
        <slot></slot>
    </div>
</template>

<script>

</script>

<style lang="less">
    .tabbar{
        width:100%;
        height:5.025em;
        position:absolute;
        bottom:0;
        display:flex;
        flex-direction: row;
        justify-content: space-around;
    }
</style>