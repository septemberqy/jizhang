<template>
    <a class="tabbar-item" :class="{'is-active':isActive}" @click="goToRoute">
        <span v-show="!isActive">
            <slot name="normal-icon"></slot>
        </span>
        <span  v-show="isActive">
             <slot name="active-icon"></slot>
        </span>
        <slot></slot>
    </a>
</template>

<script>
    export default{
        props:{
            id:{
                type:String,
                default:""
            }
        },
        data(){
            return {}
        },
        computed:{
            isActive:function(){
                if(this.$route.path == this.id){
                    return true;
                }
                return false;
            }
        },
        methods:{
            goToRoute:function(){
                this.$router.push(this.id);
            }
        }
    }
</script>

<style lang="less">
        .is-active{
            color:#ffd65b!important;
            background:#f5f5f5;
        }
    .tabbar-item{
        display:flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width:33%;
        text-align: center;
        color:#bfbfbf;
        img{
            width:2.5em;
        }
       
    }
</style>