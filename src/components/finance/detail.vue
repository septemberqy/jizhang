<template>
<div>
    <div class="detail-box">
        <div class="month">
            <slot name="month"></slot>
        </div>
        <div class="type">
            <div class="in  typebox">
                    收入: <slot name="in"></slot>
            </div>
            <div class="out typebox">
               支出: <slot name="out"></slot>
            </div>
        </div>
    </div>
    <div class="table">

    </div>
</div>
</template>

<script>
export default{
    data(){
        return {
            isShow:false
        }
    },
    methods:{
        goToUrl:function(url){
            this.$router.push({name:"finance",params:{type:url}});
        },
        
    },
    computed:{
        // show:function(){
        //     if(this.$router.query.type=="in")
        //     {
        //         return true
        //     }
        // }
    }
}
</script>

<style lang="less" scoped>
    .detail-box{
        display:flex;
        flex-direction: column;
        .month{
            width:30%;
            height:2em;
            font-size:20px;
            font-weight: bold;
            background:lightseagreen;
            line-height: 2em;
            margin:0px auto;
            text-align: center;
            border:1px solid #eee;
            border-radius: 20px;
        }

        .type{
            display:flex;
            flex-direction: row;
            width:80%;
            height:2em;
            margin:1em auto 0;
            
            .typebox{
                width:50%;
                text-align: center;
                line-height:2em;
                a{
                    color:#000;
                    text-decoration: none;
                }

                .router-link-exact-active{
                    background:#eee;
                }
            }
        }
    }
</style>