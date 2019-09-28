<template>
	<div class="loginbox">
		<div class="title">
			掌本<br>
			手机金库管家!
		</div>
		
		<div class="infobox">
			<input type="text" name="username" id="username" placeholder="手机号码" v-model="username">
			<input type="password" name="password" id="password" placeholder="密码" v-model="password">
			<div class="msg" v-show=isErr>{{errMsg}}</div>
			<button @click="login" class="btn">登录</button>
			<div class="text">
				<span><router-link to="resetpwd">忘记密码</router-link></span>
				<span><router-link to="regist">新用户注册</router-link></span>
			</div>
			
		</div>
	</div>
</template>

<script>
	import axios from 'axios';
	import qs from "qs";
	export default{
		data(){
			return {
				username:"",
				password:"",
				captcha_code:"",
				captcha_key:"",
				isErr:false,
				errMsg:""
			}
		},
		methods:{
			login:async function(){
				let url="http://jizhang-api-dev.it266.com/api/user/token/mobile";
				let param = {
					mobile:this.username,
 					password:this.password,
 					captcha_code:this.captcha_code,
 					captcha_key:this.captcha_key
				};
				if(this.username==""){
					this.$toast("请输入手机号")
				}
				else if(this.password==""){
					this.$toast("请输入密码")
				}
				else if(this.username.length!=11)
				{
					this.$toast("手机格式不正确")
				}
				else{
					await axios.post(url,qs.stringify(param)).then(
						res=>{
							if(res.data.code==0){
									localStorage.setItem("accessToken",res.data.data.token);	
                            		this.waitPush(this,"登陆成功","finance")
							}
							else{
								this.$toast(res.data.data);
							}
					})
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	@import "../../css/login.less";
    @import "../../../node_modules/vant/lib/index.css";
</style>

