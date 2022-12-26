import { createStore } from "vuex";
import authHeader from "@/services/auth-header";
import auth from "./auth";

export default createStore({
  state: {},
  getters: {
    getHeaders: () => authHeader(),
  },
  mutations: {},
  actions: {},
  modules: {
    auth,
  },
});
