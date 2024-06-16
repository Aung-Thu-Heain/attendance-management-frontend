import { defineStore } from "pinia";
import { HTTP } from '@/services/http-common';

export const useLoginStore = defineStore('loginStore', {

    state: () => ({
        token: localStorage.getItem('token') || null,
        isAuth: localStorage.getItem('isAuth') || 0,
        authUser: null
    }),

    getters: { 
        getToken: (state) =>  'Bearer ' + state.token,
        isLoggedIn: (state) =>  parseInt(state.isAuth),
        getCurrentUser : (state) => state.authUser
    },

    actions: {
        async login(formData){
            await HTTP.post("/login", formData)
            .then((response) => {

                this.token = response.data.token;
                this.authUser = response.data;
                this.isAuth = 1;

                localStorage.setItem('token', this.token);
                localStorage.setItem('isAuth', this.isAuth);
                localStorage.setItem('authUser', this.authUser);
            })
            .catch((error) => {
                console.log(error);
            });
        },

        async logout(){
           await HTTP.post("/logout")
            .then((response) => {
                this.isAuth = 0;
                this.token = null;
                this.authUser = null;

                const allKeys = Object.keys(localStorage);

                for (const key of allKeys) {
                    if (key !== "websitefavIcon") {
                        localStorage.removeItem(key);
                    }
                }
            })
            .catch((error) => {

                this.isAuth = 0;
                this.token = null;

                localStorage.setItem('token', this.token);
                localStorage.setItem('isAuth', this.isAuth);
                
                
            });
        },

        async unAuthorizedLogout() { 
            this.isAuth = 0;
            this.token = null;

            localStorage.setItem('token', this.token);
            localStorage.setItem('isAuth', this.isAuth);
        },
    }
});