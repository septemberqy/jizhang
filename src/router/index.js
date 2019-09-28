import Vue from 'vue'
import Router from 'vue-router'
import Login from "../pages/user/login"
import Regist from "../pages/user/regist"
import Book from "../pages/app/book"
import Me from "../pages/app/me"
import Remember from "../pages/app/remember"
import Finance from "../pages/app/finance"
import AssetsMange from "../pages/app/assetsMange"
import AssetsEdit from "../pages/app/assetsEdit"
import AssetsAdd from "../pages/app/assetsAdd"
import incomMange from "../pages/app/incomMange"
import incomEdit from "../pages/app/incomeEdit"
import incomAdd from "../pages/app/incomeAdd"
import payMange from "../pages/app/payMange"
import payAdd from "../pages/app/payAdd"
import payEdit from "../pages/app/payEdit"
import financedDetail from "../pages/app/financedDetail"
import financedEdit from "../pages/app/financeEdit"
import Sequel from "../pages/app/sequel"
import singleUpdate from "../pages/app/singleUpdate"
import personalData from "../pages/app/personalData"
import newNickName from "../pages/app/newNickName"
import newPhone from "../pages/app/newPhone"
import set from "../pages/app/set"
import setPassword from "../pages/app/setPassword"
import bookMange from "../pages/app/bookMange"
import bookEdit from "../pages/app/bookEdit"
import idel from "../pages/app/idel"
import memberMange from "../pages/app/memberMange"
import memberAdd from "../pages/app/memberAdd"
import resetPwd from "../pages/app/resetPwd"

let title="账本";
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/book',
      component: Book,
      meta:{
        isShow:true,
        topShow:true,
        title,
        requiresAuth: true
      }
    },
    {
      path: '/bookmange',
      component: bookMange,
      meta:{
        isShow:false,
        topShow:true,
        title:"账簿管理",
        back:true,
        requiresAuth: true,
        backUrl:"me"
      }
    },
    {
      path: '/bookedit',
      component: bookEdit,
      meta:{
        isShow:false,
        topShow:false,
        back:true,
        requiresAuth: true,
        backUrl:"bookmange"
      }
    },
    {
      path:'/resetpwd',
      component:resetPwd,
      meta:{
        isShow:false,
        topShow:true,
        title:"重置密码",
        back:true
      }
    },
    {
      path:'/remember',
      component:Remember,
      meta:{
        isShow:false,
        topShow:true,
        back:true,
        title,
        requiresAuth: true,
        backUrl:"finance"
      }
    },
    {
      path: '/me',
      component: Me,
      meta:{
        isShow:true,
        topShow:true,
        title,
        requiresAuth: true
      }
    },
    {
      path: '/idel',
      component: idel,
      meta:{
        isShow:false,
        topShow:true,
        title:"意见和反馈",
        back:true,
        requiresAuth: true
      }
    },
    {
      path: '/membermange',
      component: memberMange,
      meta:{
        isShow:false,
        topShow:true,
        title:"记账成员管理",
        back:true,
        requiresAuth: true,
        backUrl:"book"
      }
    },
    {
      path: '/memberadd',
      component: memberAdd,
      meta:{
        isShow:false,
        topShow:true,
        title:"记账成员添加",
        back:true,
        requiresAuth: true,
        backUrl:"membermange"
      }
    },
    {
      path: '/personaldata',
      component: personalData,
      meta:{
        isShow:false,
        topShow:true,
        title:"个人资料",
        back:true,
        requiresAuth: true,
        backUrl:"me"
      }
    },
    {
      path: '/newnickname',
      component: newNickName,
      meta:{
        isShow:false,
        topShow:true,
        title:'修改昵称',
        back:true,
        requiresAuth: true,
        backUrl:"personaldata"
      }
    },
    {
      path: '/newphone',
      component: newPhone,
      meta:{
        isShow:false,
        topShow:true,
        title:"设置手机号码",
        back:true,
        requiresAuth: true,
      }
    },
    {
      path: '/set',
      component: set,
      meta:{
        isShow:false,
        topShow:true,
        title:"设置",
        back:true,
        requiresAuth: true,
        backUrl:"me"
      }
    },
    {
      path: '/setpassword',
      component: setPassword,
      meta:{
        isShow:false,
        topShow:true,
        title:"设置新密码",
        back:true,
        requiresAuth: true,
        backUrl:"set"
      }
    },
    {
      path: '/finance',
      // component:resolve => require(["../pages/app/finance"],resolve),

      component: Finance,
      meta:{
        isShow:true,
        topShow:true,
        title,
        requiresAuth: true
      }
    },
    {
      path: '/financedetail',
      component: financedDetail,
      meta:{
        isShow:false,
        topShow:true,
        title:"账面收支明细",
        back:true,
        requiresAuth: true,
        backUrl:"finance"
      }
    },
    {
      path: '/sequel',
      component: Sequel,
      meta:{
        isShow:false,
        topShow:false,
        back:true,
        requiresAuth: true
      }
    },
    {
      path: '/financeedit',
      component: financedEdit,
      meta:{
        isShow:false,
        topShow:true,
        title:"账面收支编辑",
        back:true,
        requiresAuth: true,
        backUrl:"financedetail"
      }
    },
    {
      path:"/assetsmange",
      component:AssetsMange,
      meta:{
        isShow:false,
        topShow:true,
        title:"资产账户管理",
        back:true,
        requiresAuth: true,
        backUrl:"book"
      }
    },
    {
      path:"/assetsedit",
      component:AssetsEdit,
      meta:{
        isShow:false,
        topShow:true,
        title:"资产账户修改",
        back:true,
        requiresAuth: true,
        backUrl:"assetsmange"
      }
    },
    {
      path:"/incomemange",
      component:incomMange,
      meta:{
        isShow:false,
        topShow:true,
        title:"收入类别管理",
        back:true,
        requiresAuth: true,
        backUrl:"book"
      }
    },
    {
      path:"/paymange",
      component:payMange,
      meta:{
        isShow:false,
        topShow:true,
        title:"支出类别管理",
        back:true,
        requiresAuth: true,
        backUrl:"book"
      }
    },
    {
      path:"/incomeedit",
      component:incomEdit,
      meta:{
        isShow:false,
        topShow:true,
        title:"收入类别修改",
        back:true,
        requiresAuth: true,
        backUrl:"incomemange"
      }
    },
    {
      path:"/payedit",
      component:payEdit,
      meta:{
        isShow:false,
        topShow:true,
        title:"支出类别修改",
        back:true,
        requiresAuth: true,
        backUrl:"paymange"
      }
    },
    {
      path:"/incomeadd",
      component:incomAdd,
      meta:{
        isShow:false,
        topShow:true,
        title:"收入类别添加",
        back:true,
        requiresAuth: true
      }
    },
    {
      path:"/singleupdate",
      component:singleUpdate,
      meta:{
        isShow:false,
        topShow:false,
        back:true,
        requiresAuth: true
      }
    },
    {
      path:"/payadd",
      component:payAdd,
      meta:{
        isShow:false,
        topShow:true,
        title:"支出类别添加",
        back:true,
        requiresAuth: true,
        backUrl:"paymange"
      }
    },
    {
      path:"/assetsadd",
      component:AssetsAdd,
      meta:{
        isShow:false,
        topShow:true,
        title:"资产账户添加",
        back:true,
        requiresAuth: true,
        backUrl:"assetsmange"
      }
    },
    {
    	path:'/login',
      // component: Login
      component:resolve => require(["../pages/user/login"],resolve)
      
    },
    {
      path:'/regist',
      component:Regist
    },
    {
      path:"*",
      redirect:"/finance",
      requiresAuth: true

    }
  ],
  scrollBehavior (to,from,savePosition){
    return {x:0,y:0}
  }
})
