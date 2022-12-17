import { createStore } from "vuex";
import authHeader from "@/services/auth-header";

export default createStore({
  state: {
    token: null,
  },
  getters: {
    getHeaders: () => authHeader(),
  },
  mutations: {},
  actions: {
    storeUserData: ({ state }, value) => {
      state.token = value;
      localStorage.setItem("token", state.token);
    },
  },
  modules: {},
});
