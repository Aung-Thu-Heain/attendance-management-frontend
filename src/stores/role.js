import { HTTP } from "@/services/http-common";
import { defineStore } from "pinia";

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
  },
});
