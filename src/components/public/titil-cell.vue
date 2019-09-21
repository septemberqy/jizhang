<template>
    <div class="title-cell">
        <slot></slot>
    </div>
</template>

<style>
    .title-cell{
        width:100%;
        padding-left:5%;
        padding-right:5%;
        box-sizing: border-box;
        height:2em;
        line-height: 2em;
        font-size:14px;
        background:#eee;
        color:#666;
    }
</style>