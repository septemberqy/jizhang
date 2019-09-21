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
				await axios.post(url,qs.stringify(param)).then(
					 data=>{
						console.log(data);
						if(data.data.status==false){
							this.isErr=true;
							this.errMsg = data.data.data;
						}
						else{
							localStorage.setItem("accessToken",data.data.data.token);		
							console.log(data.data.data.token)	
						}
				}).then(()=>{
					this.$router.push("/finance");
				})
			}
		}
	}
</script>

<style lang="less">
	@import "../../css/login.less";
</style>

