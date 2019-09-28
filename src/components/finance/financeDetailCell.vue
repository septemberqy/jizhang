<template>
            <div class="finance-detail-cell" @click="goToUrl(id)">
                <div class="typeIconBox">
                    <slot name="typeIcon" ></slot>
                    <slot name="date"></slot>
                </div>
                <div class="moneyInfo">
                    <slot name="objName"></slot>
                    <slot name="wait"></slot>
                </div>
                <div class="money">
                    <slot name="money"></slot>
                </div>
                <img src="../../assets/images/right.png" class="rightIcon">
            </div>
</template>

<script>
    export default{
        props:{
            id:{
                type:Number
            }
        },
        data(){
            return {
               
            }
        },
        methods:{
          goToUrl:function(id){
              
              this.$router.push({path:'financeedit',query:{id}})
          }
        }
    }
</script>

<style lang="less" scoped>
    @import "../../../node_modules/vant/lib/index.less";
    .finance-detail-cell{
        width:90%;
        margin:0 auto;
        border-bottom:1px solid #eee;
        border-top:1px solid #eee;
        height:5em;
        display:flex;
        flex-direction: row;
        padding-top:0.3em;
        justify-content: space-between;
        align-items: center;
        .typeIconBox{
            display:flex;
            flex-direction: column;
            .typeIcon{
                width:3em;
                height:3em;
            }
            .date{
                margin-top:0.3em;
                text-align: center;
            }
        }
        .moneyInfo{
            margin-left:0.5em;
            width:50%;
            .objName{
                font-size:18px;
                font-weight: bold;
            }
            .ishidden{
                display:none;
            }
            .base{
                padding:0.3em;
                margin-top:0.5em;
                border-radius: 10px;
                box-sizing: border-box;
                display:inline-block;
            }
            .red{
                border:1px solid red;
                color:red;
            }
            .green{
                border:1px solid green;
                color:green;
            }

        }
        .rightIcon{
            width:1em;
            height:1em;
        }
        .money{
            font-size:20px;
        }
    }
    .buttonBox{
        display:flex;
        flex-direction: column;
    }
</style>