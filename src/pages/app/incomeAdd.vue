<template>
    <div class="box">   
            <titleCell>收入类别名称</titleCell>
            <inputBox>
                <span slot="deco" class="base">收入类别名称</span>
                <span slot="input" class="base">
                         <input type="text" name="name" slot="input" v-model=name autofocus="autofocus" placeholder="添加类别名称">
                </span>
            </inputBox>
            <div class="addBottom bottombase" @click="addCategroy">
                    添加
            </div>
    </div>
</template>

<script>
    import inputBox from "../../components/remember/input-detail";
    import titleCell from "../../components/public/titil-cell";

    import axios from "axios";
    import qs from "qs";
    export default{
        data(){
            return {
                token:"",
                name:""
            }
        },
       
        components:{
            inputBox,
            titleCell
        },
        mounted(){
            this.token = localStorage.getItem("accessToken");

        },
        methods:{
            
            addCategroy:function(){
                let params={
                    parent_id:0,
                    type:1,
                    name:this.name,
                    sort:10
                }
                
                axios.post(this.GLOBAL_.apiUrl+`api/category/create?token=${this.token}`,qs.stringify(params)).then(
                    res=>{
                        
                        if(res.data.code==0){
                            this.$toast("添加成功");
                            this.$router.go(-1);
                        }
                    }
                )
            }
        }
    }
</script>

<style lang="less">
    @import "../../../node_modules/vant/lib/index.less";
    @import "../../css/public.less";

    .box{
        margin-top:5em;
    }

  
</style>