<template>
    <div>
        <top>
            <span slot="title">{{title}}</span>
        </top>
        <div class="bookEdit">
            <inputBox>
                    <span slot="deco" class="base">账簿名称</span>
                    <span slot="input" class="base">
                            <input type="text" name="name" slot="input" v-model=name autofocus="autofocus" placeholder="账簿名称">
                    </span>
                </inputBox>
                <div class="bottombase bookBtn" @click="doAct">
                        {{btnValue}}
                </div>
        </div>
    </div>
</template>

<script>
    import inputBox from "../../components/remember/inputDetail";
    import top from "../../components/public/top";
    import axios from "axios";
    import qs from "qs";
    

    export default{
        components:{
            inputBox,
            top
        },
        data(){
            return {
                token:"",
                btnValue:"",
                name:"",
                title:""
            }
        },
        mounted(){
            this.token=localStorage.getItem("accessToken");
            let act = this.$route.query.act;
            if(act=="update"){
                this.btnValue="更新";
                this.name=this.$route.query.name;
                this.title="账簿编辑"
            }else if(act=="new"){
                this.btnValue="新建";
                this.title="账簿添加"
            }
        },
        methods:{
            doAct:function(){
                if(this.name==""){
                    this.$toast("请输入账簿名称")
                }
                else{
                    this.$toast.loading({
                        mask: true,
                        message: '加载中...'
                    });
                    if(this.$route.query.act=="update"){
                        let params = {
                            book_id:this.$route.query.id,
                            book_name:this.name
                        }
                        axios.post(this.GLOBAL_.apiUrl+`api/book/update?token=${this.token}`,qs.stringify(params)).then(
                            res=>{
                                if(res.data.status==true){
                                    this.waitPush(this,"修改成功",-1)
                                
                                }
                                else{
                                    this.$toast.fail(res.data.data);
                                }
                            }
                        )
                    }else if(this.$route.query.act=="new"){
                        let params = {
                            name:this.name
                        }
                        axios.post(this.GLOBAL_.apiUrl+`api/book/create?token=${this.token}`,qs.stringify(params)).then(
                            res=>{
                                if(res.data.status==true){
                                    this.waitPush(this,"创建成功","bookmange")
                                }
                                else{
                                    this.$toast.fail(res.data.data);
                                }
                            }
                        )
                    }
                }
            }
        }
    }
</script>


<style lang="less" scoped>
    @import "../../css/public.less";
    @import "../../css/const.less";

    .bookEdit{
        margin-top:@marginTop;
        .bookBtn{
            margin-top:1em;
        }
    }
</style>