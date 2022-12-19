import { createStore } from "vuex";
import authHeader from "@/services/auth-header";

export default createStore({
  state: {
    token: null,
    authetication: false,
  },
  getters: {
    getHeaders: () => authHeader(),
  },
  mutations: {
    currentUserAuth: (state) => {
      state.token = localStorage.getItem("token");
      if (state.token) {
        state.authetication = true;
      } else {
        state.authetication = false;
      }
    },
    logout: (state) => {
      localStorage.removeItem("token");
      state.token = null;
      state.authetication = false;
    },
  },
  actions: {
    storeUserData: ({ state }, value) => {
      state.token = value;
      localStorage.setItem("token", state.token);
      state.authetication = true;
    },
  },
  modules: {},
});
