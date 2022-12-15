import { createStore } from "vuex";

export default createStore({
  state: {
    token: null,
    apiUrl: "http://localhost:8000/api/",
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
