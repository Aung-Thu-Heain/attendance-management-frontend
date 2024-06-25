import { HTTP } from "@/services/http-common";
import { defineStore } from "pinia";

export const useClassStore = defineStore("userClass", {
  state: () => ({
    is_loading: false,
    is_error: false,
    classes: [],
  }),
  getters: {
    getLoading: (state) => state.is_loading,
    getClass: (state) => state.classes,
  },
  actions: {
    async getClassFun() {
      this.is_loading = true;
      await HTTP.get("/classrooms")
        .then((res) => {
          this.classes = res.data.classrooms;
          this.is_loading = false;
        })
        .catch((error) => {
          this.is_loading = false;
          this.is_error = true;
        });
    },

    async createClassFun(data) {
      this.is_loading = true;
      await HTTP.post("/classes/create", data)
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
    async updateClassFun(id, data) {
      this.is_loading = true;
      await HTTP.put("/classes/update/" + id, data)
        .then((res) => {
          this.is_loading = false;
        })
        .catch((error) => {
          this.is_loading = false;
          this.is_error = true;
          console.log(error);
        });
    },
    async deleteClassFun(id) {
      this.is_loading = true;
      await HTTP.delete("/classes/delete/" + id)
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
