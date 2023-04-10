import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/user/";

const register = (email, password) => {
  return axios.post(API_URL + "signup", {
    email:email,
    password:password,
  });
};

const login = (email, password) => {
  return axios
    .post(API_URL + "login", {
        email:email,
        password:password,
    })
    .then((response) => {
      if (response.data.token) {
        console.log(response.data.token, "XX");
        localStorage.setItem("user", response.data.token);
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
  return true;
  // return axios.post(API_URL + "signout").then((response) => {
  //   return response.data;
  // });
};

// const getCurrentUser = () => {
//   return JSON.parse(localStorage.getItem("user"));
// };

const AuthService = {
  register,
  login,
  logout,
//   getCurrentUser,
}

export default AuthService;