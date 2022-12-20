import { createStore } from "vuex";
import authHeader from "@/services/auth-header";

export default createStore({
  state: {
    token: null,
    userInfo: {},
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
      localStorage.removeItem("userData");
      state.token = null;
      state.userInfo = {};
      state.authetication = false;
    },
  },
  actions: {
    storeUserData: ({ state }, value) => {
      state.token = value.token;
      state.userInfo = value.userInfo;
      localStorage.setItem("token", state.token);
      localStorage.setItem("userData", JSON.stringify(state.userInfo));
      state.authetication = true;
    },
  },
  modules: {},
});
