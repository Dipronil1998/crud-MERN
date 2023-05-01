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

const createPosts = async (title, content, image) => {
  try {
    const data = {
      title:title,
      content:content,
      image: image
    }
    console.log(data,"data");
    // return
    const token = await AuthService.getCurrentUser();
    const response = await axios.post(API_URL, data,{
      headers: { 
        authorization: `Bearer ${token}`,
        'content-type': 'multipart/form-data' 
      },
    })
    return response;
  } catch (error) {
    return error.response;
  }
}

const PostService = {
  getPosts,
  deletePosts,
  createPosts
};

export default PostService;
