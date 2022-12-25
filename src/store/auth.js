// import axios from "axios";
import router from "@/router";

export default {
  namespaced: true,
  state: {
    authenticated: false,
    user: {},
  },
  getters: {},
  mutations: {
    SET_AUTHENTICATED: (state, value) => {
      state.authenticated = value;
    },
    SET_USER: (state, value) => {
      state.user = value;
    },
  },
  actions: {
    login: ({ commit }, data) => {
      commit("SET_USER", data.user);
      commit("SET_AUTHENTICATED", true);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("api-key", data.token);
      router.push({ name: "home" });
    },
    logout: ({ commit }) => {
      commit("SET_USER", {});
      commit("SET_AUTHENTICATED", false);
      localStorage.removeItem("user");
      localStorage.removeItem("api-key");
    },
  },
};
