<template>
    <div class="singleupdatebox">
        <topBox>
            <span slot="title">{{title}}</span>
        </topBox>
        <inputBox v-if="keyword=='date'">
            <span slot="deco" class="base">{{title}}</span>
            <span slot="input" class="base">
                <input type="text" name="obj"  slot="input" v-model=content @click="showPopup">                
            </span>
        </inputBox>
        <inputBox v-else-if="keyword=='remark'">
            <span slot="deco" class="base">{{title}}</span>
            <span slot="input" class="base">
                <textarea name="obj"  slot="input" v-model=content class="message"> </textarea>
            </span>
        </inputBox>
        <div v-else-if="keyword=='account'">
            <inputBox  >
                <span slot="deco" class="base">{{title}}</span>
                <span slot="input" class="base">
                    <a @click="showAccount">
                        {{contenttitle}}  
                        <img src="../../assets/images/right.png" v-if=!cShow>
                        <img src="../../assets/images/down.png" v-else-if=cShow>
                    </a>
                </span>
            </inputBox>
            <van-radio-group v-model="payAccount"  v-show=cShow>
                        <van-radio class="radiobox" v-for="(items,index) in payAccountData" :key=index :name=items.id @click="getContent">{{items.name}}</van-radio>
            </van-radio-group>
        </div>
        <inputBox v-else-if="keyword=='image'">
            <span slot="deco" class="base">{{title}}</span>
            <span slot="input" class="base">
                    <van-uploader :after-read="afterRead" name="file"/>
                    <img :src=i.thumbnail v-for="(i,index) in imageList" :key=index class="camera">
            </span>
        </inputBox>
        <inputBox v-else>
            <span slot="deco" class="base">{{title}}</span>
            <span slot="input" class="base">
                <input type="text" name="obj"  slot="input" v-model=content>
            </span>
        </inputBox>
        <div class="saveBottom bottombase" @click="updateData">
                保存
        </div>
        <van-popup v-model="show"  position="bottom" :style="{ height: '40%',width:'100%'}">
            <van-datetime-picker
                v-model="currentDate"
                type="date"
                :min-date="minDate"
                @confirm="show=false"
                @change="getTime"
                @cancel="cancelTime"
            />
            </van-popup>
       
    </div>
</template>


<style lang="less" scoped>
    @import "../../css/public.less";
    @import "../../../node_modules/vant/lib/index.css";
    @import "../../css/const.less";

    .singleupdatebox{
        margin-top:@marginTop;
    }
    
    .saveBottom{
        margin-top:1em;
    }
    
</style>

<script>
    import axios from "axios";
    import qs from "qs";
    import inputBox from "../../components/remember/inputDetail";
    import topBox from "../../components/public/top";

    export default{
        components:{
            topBox,
            inputBox
        },
        mounted(){
            this.token = localStorage.getItem("accessToken");

             this.title=this.$route.query.name;
             this.content=this.$route.query.content;
             this.contenttitle = this.$route.query.content;
             this.keyword = this.$route.query.keyword;
             if(this.keyword=="image"){
                 this.getImages();
             }
             this.getAccount(this.token);
        },
        data(){
            return {
                token:"",
                title:"",
                content:"",
                keyword:"",
                show:false,
                currentDate: new Date(),
                  minDate: new Date(2018,1,1),
                 maxDate: new Date(),
                 cShow:false,
                 payAccount:"",
                 payAccountData:[],
                 contenttitle:"",
                 imageList:[]
            }
        },
        computed:{
            
            getcShow:function(){
                return this.cShow;
            }
        },
        methods:{
            getImages:function(){
                this.imageList=[];
                let rid = this.$route.query.rid;
                let id = this.$route.query.iid;
                axios.get(this.GLOBAL_.apiUrl+`api/record/detail?id=${rid}&token=${this.token}`).then(
                    res=>{
                        let items = res.data.data.items;
                        for(let item of items){
                               if(id == item.id){
                                    this.imageList = this.imageList.concat(item.images)
                               }
                        }
                    }
                )
            },
            afterRead:function(file){
                this.$toast.loading({
                    mask: true,
                    message: '加载中...'
                });
                let id = this.$route.query.iid;
                let fd = new FormData()
                fd.append('file', file.file)
                 axios.post(this.GLOBAL_.apiUrl+`api/upload/image?token=${this.token}`,fd,{headers: {
                     'Content-Type': 'multipart/form-data'
                 }}).then(
                        res=>{
                            if(res.data.code==0){
                                this.$toast.clear();
                                let key = res.data.data.file.fileKey;
                                let params={
                                    image_keys:key
                                }
                            
                                axios.post(this.GLOBAL_.apiUrl+`api/record/item/update?itemId=${id}&token=${this.token}`,qs.stringify(params)).then(
                                    res=>{
                                        if(res.data.code==0){
                                            this.$toast.success("保存成功");
                                            this.getImages();
                                        }else{
                                            this.$toast.fail(res.data.data)
                                        }
                                    }
                                )
                            }else{
                                this.$toast.fail(res.data.data)
                            }
                        }
                    )
            },
            getContent:function(){
                for(let item of this.payAccountData){
                    if(item.id==this.payAccount){
                        this.contenttitle = item.name;
                        this.content = item.id;
                    }
                }
                this.cShow=false;
            },
            showAccount:function(){
                this.cShow=!this.cShow;
            },
            getAccount:function(token){
                this.$toast.loading({
                    mask: true,
                    message: '加载中...'
                });
                axios.get(this.GLOBAL_.apiUrl+"api/account?token="+token).then(
                    res=>{
                        if(res.data.code==0){
                            this.$toast.clear();
                            for(let item of res.data.data) {
                                let sData={};
                                sData["id"] = item.id;
                                sData['name'] = item.name;
                                this.payAccountData.push(sData);
                            }
                        }else{
                            this.$toast.fail(res.data.data)
                        }
                    }
                )
            },
            cancelTime:function(){
                this.content=this.$route.query.content;
                this.show=false;
            },
            showPopup:function(){
                this.show=true;
            },
            getTime:function(e){
                 let changeValue = e.getValues();
                 this.content = changeValue.join("-");
            },
            updateData:function(){
                if(this.content==""){
                    this.$toast("请填入数据")
                }
                else{
                    this.$toast.loading({
                        mask: true,
                        message: '加载中...'
                    });
                    let id = this.$route.query.fid==undefined?this.$route.query.iid:this.$route.query.fid;
                    let url =  this.$route.query.fid==undefined?this.GLOBAL_.apiUrl+`api/record/item/update?itemId=${id}&token=${this.token}`:this.GLOBAL_.apiUrl+`api/record/update?id=${id}&token=${this.token}`;
                    let params={};
                    switch(this.keyword){
                        case "total_money":
                            params["total_money"]=this.content;
                            break;
                        case "company_name":
                            params["company_name"]=this.content;
                            break;
                        case "money":
                            params["money"]=this.content;
                            break;
                        case "date":
                            params["date"]=this.content;
                            break;
                        case "remark":
                            params["remark"]=this.content;
                            break;
                        case "account":
                            params["account_id"]=this.content;
                            break;
                    }
                    
                    axios.post(url,qs.stringify(params)).then(
                        res=>{
                        if(res.data.code==0){
                            this.waitPush(this,"修改成功",-1)
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
</script>