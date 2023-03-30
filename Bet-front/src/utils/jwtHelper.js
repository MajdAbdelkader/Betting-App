function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
  return JSON.parse(jsonPayload);
}
function saveJwtAndUserInfo(token) {
  localStorage.setItem("jwt_token", token);
  const userObj = JSON.stringify(parseJwt(token));
  localStorage.setItem("user", userObj);
}
function getUserFromLocalStorage() {
  console.log(localStorage.getItem("user"));
  return JSON.parse(localStorage.getItem("user"));
}
function logout() {
  localStorage.removeItem("jwt_token");
  localStorage.removeItem("user");
  return true;
}
export { parseJwt, saveJwtAndUserInfo, getUserFromLocalStorage, logout };
