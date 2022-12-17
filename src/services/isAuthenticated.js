let accessToken = localStorage.getItem("token");
let isAuthenticated;
if (accessToken) {
  isAuthenticated = true;
} else {
  isAuthenticated = false;
}

export default isAuthenticated;
