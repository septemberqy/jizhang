<template>
    <div class="inputbox" @click="goToUrl(id,querys)">
        <div class="leftbox">
            <slot name="icon"></slot>
            <slot name="deco"></slot>
        </div>
        <slot name="input"></slot>
    </div>
</template>

<script>
export default{
    props:{
        id:{
            type:String
        },
        querys:{
            type:Object
        }
    },
    methods:{
        goToUrl:function(id,querys){
            if(id!=undefined)
            {
                if(querys!=undefined)
                {
                    this.$router.push({path:id,query:querys});
                }
                else{
                    this.$router.push(id)
                }
            }
    }
}
}
</script>

<style lang="less" scoped>
    .inputbox{
        width:90%;
        display:flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin:0 auto ;
        padding:0.5em 0;
        border-bottom:1px solid #eee;
         .infoIcon{
                width:4em;
                height:4em;
                margin-right:1em;
                border-radius: 50%;
            }
        .leftbox{
            display:flex;
            flex-direction: row;
            width:10em;
            .icon{
                margin-right:2em;
            }
            .info{
                display:flex;
                flex-direction: column;
                justify-content: flex-start;
            }
            .bigIcon{
                width:2em;
                height:2em;
                margin-right:1em;
            }
            .infoIcon{
                width:4em;
                height:4em;
                margin-right:1em;
            }
        }
         input{
            border:0;
            width:5em;
            height:2em;
            font-size:16px;
            text-align: right;
            
        }
        .base{
            color:#666;
            line-height: 2em;
            .in{
                color:red
            }
            .out{
                color:green;
            }
            .profit{
                color:orange;
            }
        }
      
        img{
                width:1em;
                height:1em;
                vertical-align: middle;
            }
        .camera{
            width:5em;
            height:5em;
        }
        
    }


</style>