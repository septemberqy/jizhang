<template>
    <div class="box">   
            <titleCell>请输入新的支出类别名称</titleCell>
            <inputBox>
                <span slot="deco" class="base">支出类别名称</span>
                <span slot="input" class="base">
                         <input type="text" name="name" slot="input" v-model=name autofocus="autofocus">
                </span>
            </inputBox>
            <div class="addBottom bottombase" @click="updateCategroy">
                    修改
            </div>
    </div>
</template>

<script>
    import inputBox from "../../components/remember/inputDetail";
    import titleCell from "../../components/public/titilCell";

    import axios from "axios";
    import qs from "qs";
    export default{
        data(){
            return {
                token:"",
                name:""
            }
        },
        mounted(){
             this.token = localStorage.getItem("accessToken");
            this.getName();
        },
        components:{
            inputBox,
            titleCell
        },
        methods:{
            getName:function(){
                this.name=this.$route.query.name;
            },
            updateCategroy:function(){
                let id = this.$route.query.id;
                let params={
                    name:this.name,
                    sort:10
                }
                
                axios.post(this.GLOBAL_.apiUrl+`api/category/update?id=${id}&token=${this.token}`,qs.stringify(params)).then(
                    res=>{
                        if(res.data.code==0){
                            this.$toast("修改成功");
                            this.$router.go(-1);
                        }
                    }
                )
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "../../../node_modules/vant/lib/index.css";
    @import "../../css/public.less";
    @import "../../css/const.less";

    .box{
        margin-top:@marginTop;
    }

     .addBottom{
        margin-top:2em;
    }
</style>