<template>
    <div class="sequelBox">
            <topBox>
                <span slot="title">后续{{this.$route.query.type==1?"收入":"支出"}}</span>
            </topBox>
             <inputBox>
                    <span slot="deco" class="base">{{this.keyword}}款金额</span>
                    <span slot="input" class="base">
                            <input type="text" name="number" placeholder="0.00" slot="input" v-model=money>                   
                    </span>
            </inputBox>
            <inputBox>
                <span slot="deco" class="base"> {{this.keyword}}款账户</span>
                <span slot="input" class="base">
                    <a @click="showCell()">
                        {{getAccountDeco(payAccount)}}  
                        <img src="../../assets/images/right.png" v-if=!getAllowList()>
                        <img src="../../assets/images/down.png" v-else-if=getAllowList()>
                    </a>
                </span>
            </inputBox>
            <van-radio-group v-model="payAccount" v-show=getAllowList() >
                    <van-radio class="radiobox" v-for="(items,index) in payAccountData" :key=index :name=items.id @click="allow=false">{{items.name}}</van-radio>
            </van-radio-group>
             <inputBox>
                <span slot="deco" class="base">{{this.$route.query.type==1?"收入":"支出"}}凭证</span>
                <span slot="input" class="base">

                        <van-uploader :after-read="afterRead" name="file"/>
                        <img :src=item v-for="(item,index) in this.tmpImageList" :key=index class="carema">
                        <img src="../../assets/images/right.png">
                        
                </span>
            </inputBox>
            <inputBox>
                <span slot="deco" class="base">{{this.keyword}}款日期</span>
                <span slot="input" class="base">
                    <div type="primary" @click="showPopup">
                        {{addTime}}
                        <img src="../../assets/images/right.png" v-if=!getAllowList(3)>
                        <img src="../../assets/images/down.png" v-else-if=getAllowList(3)>
                   </div>
                </span>
            </inputBox>
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
             <div class="addBottom bottombase" @click="addItem">
                新增
            </div>
    </div>
</template>

<style lang="less">
    @import "../../../node_modules/vant/lib/index.less";

    .sequelBox{
        margin-top:5em;
    }
    .carema{
        width:5em!important;
        height:5em!important;
    }
</style>

<script>
    import axios from "axios";
    import qs from "qs";
    import inputBox from "../../components/remember/input-detail";
    import topBox from "../../components/public/top";

    export default{
        mounted(){
            this.token = localStorage.getItem("accessToken");

            let isPay = this.$route.query.type==1;
            this.getAccount(this.token);
            this.keyword = isPay?"收":"付";
            this.getDefaultTime();
        },
        computed:{
            getAccountDeco(){
                return function(value){
                    if(value==0)
                    {
                        return "请选择";
                    }
                    else{
                        for(let item of this.payAccountData){
                            if(value==item.id)
                            {
                                return item.name;
                            }
                        }
                        return "请选择";
                    }
                }
            },
            getAllowList(){
                return function (){
                    return this.allow;
                }
            },
            
        },
        methods:{
            addItem:function(){
                let params={
                    record_id:this.$route.query.id,
                    money:this.money,
                    account_id:this.payAccount,
                    date:this.addTime,
                    image_keys:this.imageList.join(",")
                }

                axios.post(this.GLOBAL_.apiUrl+`api/record/sequel?token=${this.token}`,qs.stringify(params)).then(
                    res=>{
                        if(res.data.code==0){
                            this.$router.go(-1);
                        }
                        else{
                            this.$toast(res.data.data);
                        }
                    }
                )
            },
            showCell:function(){
              this.allow=!this.allow;
            },
           cancelTime:function(){
                this.getDefaultTime();
                this.show=false;
            },
            getDefaultTime:function(){
                let now = new Date();
                this.addTime = now.getFullYear()+"-"+(now.getMonth()+1)+"-"+now.getDate();
            },
             getTime:function(e){
                 let changeValue = e.getValues();
                 this.addTime = changeValue.join("-");
            },
            showPopup() {
                this.show = true;
            },
            getAccount:function(token){
                axios.get(this.GLOBAL_.apiUrl+"api/account?token="+token).then(
                    res=>{
                        for(let item of res.data.data) {
                            let sData={};
                            sData["id"] = item.id;
                            sData['name'] = item.name;
                            this.payAccountData.push(sData);
                        }
                    }
                )
            },
            afterRead:function(file){
                let fd = new FormData()
                fd.append('file', file.file)
               
                 axios.post(this.GLOBAL_.apiUrl+`api/upload/image?token=${this.token}`,fd,{headers: {
                     'Content-Type': 'multipart/form-data'
                 }}).then(
                                res=>{
                                    let key = res.data.data.file.fileKey;
                                    this.imageList.push(key);
                                    this.tmpImageList.push(res.data.data.file.thumbnailUrl._temp);
                                }
                            )
            },
        },
        components:{
            inputBox,
            topBox
        },
        data(){
            return {
                token:"",
                keyword:"",
                money:"",
                allow:false,
                payAccount:"0",
                payAccountData:[],
                imageList:[],
                tmpImageList:[],
                show:false,
                addTime:"",
                 currentDate: new Date(),
                 minDate: new Date(),
                 maxDate: new Date(),
            }
        }
    }
</script>