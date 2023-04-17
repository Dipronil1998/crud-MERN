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
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.userId);
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  return true;
};

const getCurrentUser = () => {
  return localStorage.getItem("token");
};

const getCurrentUserId = () => {
  return localStorage.getItem("userId");
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
  getCurrentUserId
}

export default AuthService;