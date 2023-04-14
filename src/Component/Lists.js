import React, { useEffect, useState } from "react";
import PostService from "../Service/PostService";

const Lists = () => {
    const [posts, setPosts] = useState();

    const getAllPosts = async () => {
        const response = await PostService.getPosts();
        console.log(response,"response");
    }

    useEffect(() => {
        getAllPosts();
    }, []);
    
    return(
        <>
            <h1>Lists</h1>
        </>
    )
}

export default Lists;