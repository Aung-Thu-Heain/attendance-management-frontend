import { HTTP } from "@/services/http-common";
import { defineStore } from "pinia";

export const useUserStore = defineStore('userStore',{
  state : () => ({
   is_loading:false,
   is_error:false,
   users:[]
  }),
  getters: {
    getLoading : (state) => state.is_loading,
    getUsers : (state) => state.users
  },

  actions:{
    async getUsersFun(){
        this.is_loading=true;
        await HTTP.get('/users').then((resp)=>{
            this.users = resp.data.users;
            this.is_loading=false;
        }).catch((error)=>{
            this.is_loading=false;
            this.is_error=true;
        })
    }
  } 
})