import React, {useEffect, useState} from "react";
import { isEmail } from "validator";
import AuthService from "../Service/AuthService";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState(false);
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

    const handleLogin = async (e) => {
        e.preventDefault();
        setMessage("");
        setLoading(true);
        setSuccessful(false);
        if(!email){
            setMessage("Please enter a email");
            setSuccessful(false);
            setLoading(false);
            return
        }
        if(!password){
            setMessage("Please enter a password");
            setSuccessful(false);
            setLoading(false);
            return
        }
        try {
            const response = await AuthService.login(email, password);
            navigate("/post");
            window.location.reload();
        } catch (error) {
            // const resMessage =
            // (error.response &&
            //   error.response.data &&
            //   error.response.data.message) ||
            // error.message ||
            // error.toString();
            setMessage(error.response.data.message);
            setSuccessful(false);
            setLoading(false);
        }
    }

    return (
        <>
            <h1>Login</h1>
            <div className="col-md-12">
                <form onSubmit={handleLogin}>
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
                        <button className="btn btn-primary btn-block">Log in</button>
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

export default Login;