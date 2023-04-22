import axios from "axios";
import AuthService from "../Service/AuthService";

const API_URL = "http://127.0.0.1:8000/api/posts/";

const getPosts = () => {
  return axios.get(API_URL);
};

const deletePosts = async (id) => {
  try {
    const token = await AuthService.getCurrentUser();
    const response = await axios.delete(API_URL + `${id}`, {
      headers: { authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    return error.response
  }
};

const PostService = {
  getPosts,
  deletePosts,
};

export default PostService;
