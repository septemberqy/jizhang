<template>
    <div class="yzmmsgbox">
        
        <slot name="title"></slot>
        
        <div class="yzminputbox">
            <slot name="img"></slot>
            <slot name="input"></slot>
        </div>
      
            <slot name="btnValue"></slot>
       
    </div>
</template>

<style lang="less" scoped> 
    @import "../../css/public.less";
    
    .yzmmsgbox{
        display:flex;
        flex-direction: column;
        padding:1em;
        box-sizing: border-box;
        .title{
            text-align:center;
            margin-bottom:1em;
        }
        .yzminputbox{
            display:flex;
            flex-direction: row;
            margin-bottom:1em;
            .yzmimg{
                width:8em;
                height:3em;
                border:1px solid #eee;
            }
            .yzminput{
                width:8em;
                height:3em;
                border:1px solid #eee;
            }
        }
        .yzmBtn{
            width:60%;
            height:2em;
            text-align: center;
            line-height: 2em;
            background:@background;
            color:#fff;
            margin:0 auto;
            border-radius: 10px;
        }
    }
</style>

<script>
   
</script>