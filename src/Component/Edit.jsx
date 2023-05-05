import React, {useEffect, useState} from "react";
import { isEmail } from "validator";
import AuthService from "../Service/AuthService";
import PostService from "../Service/PostService";
import { useNavigate, useParams } from "react-router-dom";


const Edit = () => {
    const [title, setTitle] = useState();
    const [content, setContent] = useState();
    const [image, setImage] = useState();
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState();
    const navigate = useNavigate();
    const {id} = useParams();

    const onChangeTitle = (event) =>{
        setTitle(event.target.value);
    }

    const onChangeContent = (event) =>{
        setContent(event.target.value);
    }

    const onChangeImaage = (event) =>{
        setImage(event.target.files[0]);
    }

    const getPost = async () => {
        const post = await PostService.getPostsById(id);
        setTitle(post.data.title);
        setContent(post.data.content);
        setImage(post.data.imagePath);
      };

    useEffect(()=>{
        getPost();
    },[])

    const handlePost = async (e) => {
        e.preventDefault();
        setMessage("");
        setSuccessful(false);
        if(!title){
            setMessage("Please enter a title");
            setSuccessful(false);
            return
        }
        if(!content){
            setMessage("Please enter a content");
            setSuccessful(false);
            return
        }
        if(!image){
            setMessage("Please select a image");
            setSuccessful(false);
            return
        }
        try {
            const response = await PostService.editPosts(id,title,content,image);
            setMessage(response.data.message);
            setSuccessful(true);
            setTimeout(() => {
                navigate("/");
            }, 2000);
        } catch (error) {
            console.log(error.response.data.message, "QQ");
            setMessage(error.response.data.message);
            setSuccessful(false);
        }
    }

    return (
        <>
            <h1>Edit Posts</h1>
            <div className="col-md-12">
                <form onSubmit={handlePost}>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            className="form-control"
                            name="title"
                            value={title}
                            onChange={onChangeTitle}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="content">Content</label>
                        <input
                            type="text"
                            className="form-control"
                            name="content"
                            value={content}
                            onChange={onChangeContent}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="content">Upload Image</label>
                        <input type="file" name="image" onChange={onChangeImaage} />
                    </div>
                    {image && <img src={image} height={100} width={100}></img>}
                    <div className="form-group">
                        <button className="btn btn-primary btn-block">Edit Post</button>
                    </div>
                </form>
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
            </div>
        </>
    )
}

export default Edit;