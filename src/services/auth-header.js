export default function authHeader() {
  let token = localStorage.getItem("api-key");
  if (token) {
    return { Authorization: "Bearer " + token };
  } else {
    return {};
  }
}
