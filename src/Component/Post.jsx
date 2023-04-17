import React, {useEffect, useState} from "react";
import { isEmail } from "validator";
import AuthService from "../Service/AuthService";
import { useNavigate } from "react-router-dom";

const Post = () => {
    return (
        <>
            <h1>Create Posts</h1>
            <div className="col-md-12">
                <form>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            className="form-control"
                            name="title"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="content">Content</label>
                        <input
                            type="text"
                            className="form-control"
                            name="content"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="content">Upload Image</label>
                        <input type="file" name="image" />
                    </div>

                    <div className="form-group">
                        <button className="btn btn-primary btn-block">Add Post</button>
                    </div>
                </form>
                {/* {message && (
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
                )} */}
            </div>
        </>
    )
}

export default Post;