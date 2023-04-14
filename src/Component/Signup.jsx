import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isEmail } from "validator";
import AuthService from "../Service/AuthService";

const required = (value) => {
    console.log(value, "value");
    if (!value) {
        return (
            <div className="invalid-feedback d-block">
                This field is required!
            </div>
        );
    }
};

const validEmail = (value) => {
    if (!isEmail(value)) {
        return (
            <div className="invalid-feedback d-block">
                This is not a valid email.
            </div>
        );
    }
};

const vpassword = (value) => {
    if (value.length < 6 || value.length > 40) {
      return (
        <div className="invalid-feedback d-block">
          The password must be between 6 and 40 characters.
        </div>
      );
    }
  };

const Signup = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState();

    const navigate = useNavigate();

    // useEffect(() => {
    //     const user = AuthService.getCurrentUser();
    //     if (user !== null) {
    //         navigate("/post");
    //     } else {
    //         navigate("/");
    //     }
    //   }, []);

    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setMessage("");
        setSuccessful(false);
        if(!email){
            setMessage("Please enter a email");
            setSuccessful(false);
            return
        }
        if(!password){
            setMessage("Please enter a password");
            setSuccessful(false);
            return
        }
        try {
            const response = await AuthService.register(email, password);
            setMessage(response.data.message);
            setSuccessful(true);
        } catch (error) {
            setMessage(error.response.data.message);
            setSuccessful(false);
        }
    }

    return (
        <>
            <h1>Register</h1>
            <div className="col-md-12">
                <form onSubmit={handleRegister}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="text"
                            className="form-control"
                            name="email"
                            value={email}
                            onChange={onChangeEmail}
                            // validations={[required, validEmail]}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            value={password}
                            onChange={onChangePassword}
                        // validations={[required, vpassword]}
                        />
                    </div>

                    <div className="form-group">
                        <button className="btn btn-primary btn-block">Sign Up</button>
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

export default Signup;