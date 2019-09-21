<template>
  <div id="app" v-cloak>
    <top v-show="this.$route.meta.topShow">
      <span slot="title">{{this.$route.meta.title}}</span>
    </top>
    <router-view></router-view>
    <tabbar v-show="this.$route.meta.isShow">
    
      <tabbar-item id="/book">
          <img src="./assets/images/book-normal.png" slot="normal-icon">
          <img src="./assets/images/book-active.png" slot="active-icon">
          账本
      </tabbar-item>
   
      <tabbar-item id="/finance">
          <img src="./assets/images/finance-normal.png" slot="normal-icon">
          <img src="./assets/images/finance-active.png" slot="active-icon">
          记账
      </tabbar-item>
      <tabbar-item id="/me">
          <img src="./assets/images/me-normal.png" slot="normal-icon">
          <img src="./assets/images/me-active.png" slot="active-icon">
          我的
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
import tabbar from "./components/public/tabbar";
import tabbarItem from "./components/public/tabbar-item";
import top from "./components/public/top";
export default {
  components:{
      tabbar,
      tabbarItem,
      top
  }
}
</script>

<style>
 
</style>
