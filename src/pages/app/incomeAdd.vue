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
       
        components:{
            inputBox,
            titleCell
        },
        mounted(){
            this.token = localStorage.getItem("accessToken");

        },
        methods:{
            
            addCategroy:function(){
                if(this.name==""){
                    this.$toast("请输入类型名称")
                }
                else{
                    this.$toast.loading({
                        mask: true,
                        message: '加载中...'
                    });
                    let params={
                        parent_id:0,
                        type:1,
                        name:this.name,
                        sort:10
                    }
                    
                    axios.post(this.GLOBAL_.apiUrl+`api/category/create?token=${this.token}`,qs.stringify(params)).then(
                        res=>{
                            console.log(res)
                            if(res.data.code==0){
                                this.waitPush(this,"添加成功",-1)
                            }
                            else{
                                this.$toast.fail(res.data.data)
                            }
                        }
                    )
                }
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
</style>