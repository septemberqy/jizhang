import Vue from "vue"


let vm = new Vue();
export var GLOBAL_ = {
    apiUrl:"http://jizhang-api-dev.it266.com/",
    waittime:1500,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    token:""
}

export function waitPush(obj,msg,url,waittime){
    waittime = waittime||1500
    // obj.$toast.loading({
    //      forbidClick: true,
    //      message: msg
    // })
    obj.$toast.success(
        {
            message:msg,
             forbidClick: true,
        })
    setTimeout(()=>{
        if(url==-1)
        {
            obj.$router.go(url)
        }
        else if(url=="none"){

        }
        else{
            obj.$router.push(url)
        }
    },waittime)
}