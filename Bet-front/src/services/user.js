import axios from "axios";
import { parseJwt, saveJwtAndUserInfo } from "../utils/jwtHelper";

const apiUrl = "http://localhost:8080";

const login = async (username, password) => {
  //Returns true if succesful, error message if not.
  var status;
  await axios
    .post(apiUrl + "/login", { username: username, password: password })
    .then(
      (response) => {
        saveJwtAndUserInfo(response.data.token);
        status = true;
      },
      (error) => {
        status = error.response.data.message;
      }
    );
  console.log(status);
  return status;
};
const register = async (formData) => {
  var status;
  await axios.post(apiUrl + "/user", formData).then(
    (response) => {
      saveJwtAndUserInfo(response.data.token);
      status = response.data;
    },
    (error) => {
      status = error.response.data.message;
    }
  );
  return status;
};
export { login, register };
