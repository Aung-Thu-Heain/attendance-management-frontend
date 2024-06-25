import { defineStore } from "pinia";
import { HTTP } from "@/services/http-common";

export const usePermissionStore = defineStore("permissionStore", {
  state: () => {
    return {
      is_loading: false,
      is_error: false,
      permissions: [],
    };
  },
  getters: {
    getLoading: (state) => state.is_loading,
    getPermissions: (state) => state.permissions,
  },
  actions: {
    async getPermissionFun() {
      this.is_loading = true;
      await HTTP.get("/permissions")
        .then((res) => {
          this.permissions = res.data.permissions;
          this.is_loading = false;
        })
        .catch((error) => {
          this.is_loading = false;
          this.is_error = true;
        });
    },
  },
});
