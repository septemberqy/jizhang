<template>
    <div class="mesBox">
        <div class="mesTitle">提示</div>
        <div class="mesMes">您确定要删除吗</div>
        <div class="mesChosebox">
                <slot name="cancel">

                </slot>
                <slot name="del">

                </slot>
                <!-- <div class="cancel chose" @click="show=false">取消</div>
                <div class="del chose" @click="delAccount()">删除</div> -->
        </div>
    </div>
</template>

<style lang="less">
     .mesBox{
        width:14em;
        height:6em;
        display:flex;
        flex-direction: column;
        .mesTitle{
            width:3em;
            margin:0.5em auto;
            color:#000;
            font-weight: bold
        }
        .mesMes{
            color:#666;
            width:80%;
            text-align: center;
            margin:0 auto;
        }
        .mesChosebox{
            display:flex;
            justify-content: space-between;
            .chose{
                width:50%;
                height:2em;
                text-align: center;
                line-height: 2em;
                border:1px solid #eee;
            }
            
        }
    }
</style>