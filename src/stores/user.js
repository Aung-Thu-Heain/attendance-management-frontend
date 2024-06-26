import { HTTP } from "@/services/http-common";
import { defineStore } from "pinia";
import { fa } from "vuetify/locale";

export const useUserStore = defineStore("userStore", {
  state: () => ({
    is_loading: false,
    is_error: false,
    users: [],
  }),
  getters: {
    getLoading: (state) => state.is_loading,
    getUsers: (state) => state.users,
  },
  actions: {
    async getUsersFun() {
      this.is_loading = true;
      await HTTP.get("/users")
        .then((resp) => {
          this.users = resp.data.users;
          this.is_loading = false;
        })
        .catch((error) => {
          this.is_loading = false;
          this.is_error = true;
        });
    },
    async createUserFun(data) {
      this.is_loading = true;
      await HTTP.post("/users/create", data)
        .then((res) => {
          this.is_loading = false;
          console.log(res.data.message);
        })
        .catch((error) => {
          this.is_loading = false;
          this.is_error = false;
          console.log(error);
        });
    },
    async deleteUserFun(id) {
      this.is_loading = true;
      await HTTP.delete("/users/delete/" + id)
        .then((res) => {
          this.is_loading = false;
          console.log(res.data.message);
        })
        .catch((error) => {
          this.is_loading = false;
          this.is_error = true;
          console.log(error);
        });
    },
  },
});
