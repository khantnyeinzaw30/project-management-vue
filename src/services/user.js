import store from "@/store";

const user = store.state.user
  ? store.state.user
  : JSON.parse(localStorage.getItem("user"));
export default user;
