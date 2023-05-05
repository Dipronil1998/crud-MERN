import React, { useEffect, useState } from "react";
import PostService from "../Service/PostService";
import AuthService from "../Service/AuthService";
import { Link } from "react-router-dom";

const Lists = () => {
  const [posts, setPosts] = useState();
  const [storeUserId, setStoreUserId] = useState();
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState();

  const getAllPosts = async () => {
    const response = await PostService.getPosts();
    setPosts(response.data.posts);
  };

  const getUserId = async () => {
    const userId = await AuthService.getCurrentUserId();
    setStoreUserId(userId);
  };

  const deletePost = async (id) => {
    const postDelete = await PostService.deletePosts(id);
    if (postDelete.status === 200) {
      setMessage("Post delete Successfully");
      setSuccessful(true);
    } else {
      setMessage(postDelete.data.message);
      setSuccessful(false);
    }
  };

  useEffect(() => {
    getAllPosts();
    getUserId();
  }, []);

  useEffect(() => {
    getAllPosts();
  }, [posts])

  return (
    <>
      {message && (
        <div className="form-group">
          <div
            className={
              successful ? "alert alert-success" : "alert alert-danger"
            }
            role="alert"
          >
            {message}
          </div>
        </div>
      )}
      <h1>All Posts</h1>
      <table style={{ width: 500 }}>
        <tr>
          <th>Title</th>
          <th>Content</th>
          <th>Image</th>
          <th>Action</th>
        </tr>
        {posts &&
          posts.map((post, index) => {
            return (
              <>
                <tr>
                  <td>{post.title}</td>
                  <td>{post.content}</td>
                  <td><img src={post.imagePath} height={100} width={100}></img></td>
                  <td>
                    {storeUserId === post.creator && (
                      <>
                        <Link to={'/post/' + post._id}>Edit</Link>
                        <button onClick={() => deletePost(post._id)}>
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              </>
            );
          })}
      </table>
    </>
  );
};

export default Lists;
