import { HTTP } from "@/services/http-common";
import { defineStore } from "pinia";
import { tr } from "vuetify/locale";

export const useRoleStore = defineStore("roleStore", {
  state: () => ({
    is_loading: false,
    is_error: false,
    roles: [],
  }),
  getters: {
    getLoading: (state) => state.is_loading,
    getRoles: (state) => state.roles,
  },
  actions: {
    async getRoleFun() {
      this.is_loading = true;
      await HTTP.get("/roles")
        .then((resp) => {
          this.roles = resp.data.roles;
          this.is_loading = false;
        })
        .catch((error) => {
          this.is_loading = false;
          this.is_error = true;
        });
    },
    async createRoleFun(data) {
      this.is_loading = true;
      await HTTP.post("/roles/create", data)
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

    async updateRoleFun(id, data) {
      this.is_loading = true;
      await HTTP.put("/roles/update/" + id, data)
        .then((res) => {
          this.is_loading = false;
          console.log(res);
        })
        .catch((error) => {
          this.is_loading = false;
          this.is_error = true;
          console.log(error);
        });
    },

    async deleteRoleFun(id) {
      this.is_loading = true;
      await HTTP.delete("/roles/delete/" + id)
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
