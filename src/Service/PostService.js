import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/posts/";

const getPosts = () => {
  return axios.get(API_URL);
};


const PostService = {
    getPosts
}

export default PostService;