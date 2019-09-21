import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
    state:{
        token:"123"
    },
    getters:{
        getToken:function(state){
            return state.token;
        }
    }
})


export default store;