import React, { useEffect, useState } from "react";
import PostService from "../Service/PostService";
import AuthService from "../Service/AuthService";

const Lists = () => {
  const [posts, setPosts] = useState();
  const [storeUserId, setStoreUserId] = useState();

  const getAllPosts = async () => {
    const response = await PostService.getPosts();
    setPosts(response.data.posts);
  };

  const getUserId = async () => {
    const userId = await AuthService.getCurrentUserId();
    setStoreUserId(userId)
  }

  useEffect(() => {
    getAllPosts();
    getUserId();
  }, []);

  return (
    <>
      <h1>All Posts</h1>
      <table style={{ width: 500 }}>
        <tr>
          <th>Title</th>
          <th>Content</th>
          <th>Action</th>
        </tr>
        {posts &&
          posts.map((post, index) => {
            return(
            <>
            <tr>
              <td>{post.title}</td>
              <td>{post.content}</td>
              <td>
                {
                    storeUserId === post.creator && (
                            <>
                                <button>Edit</button>
                                <button>Delete</button>
                            </>
                    )
                        
                }
                
              </td>
            </tr>
            </>
            )
            
          })}
      </table>
    </>
  );
};

export default Lists;
