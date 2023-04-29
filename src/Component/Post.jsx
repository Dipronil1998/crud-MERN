import React, {useEffect, useState} from "react";
import { isEmail } from "validator";
import AuthService from "../Service/AuthService";
import { useNavigate } from "react-router-dom";

const Post = () => {
    const [title, setTitle] = useState();
    const [content, setContent] = useState();
    const [image, setImage] = useState();
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState();
    // const [formData,setFormData] = useState({})
    // setFormData({...formData,[event.target.name]:event.target.value})

    const onChangeTitle = (event) =>{
        setTitle(event.target.value);
    }

    const onChangeContent = (event) =>{
        setContent(event.target.value);
    }

    const onChangeImaage = (event) =>{
        setImage(event.target.files[0])
        console.log(event.target.files[0], "XXX");
    }

    const handlePost = (e) => {
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
    }

    return (
        <>
            <h1>Create Posts</h1>
            <div className="col-md-12">
                <form onSubmit={handlePost}>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            className="form-control"
                            name="title"
                            onChange={onChangeTitle}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="content">Content</label>
                        <input
                            type="text"
                            className="form-control"
                            name="content"
                            onChange={onChangeContent}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="content">Upload Image</label>
                        <input type="file" name="image" onChange={onChangeImaage} />
                    </div>

                    <div className="form-group">
                        <button className="btn btn-primary btn-block">Add Post</button>
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

export default Post;