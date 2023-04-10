import React from "react";
import { Link } from "react-router-dom";
import AuthService from "../Service/AuthService";

const Menu = () => {
    // const isLogin = localStorage.getItem("user");

    const logOut = () => {
        AuthService.logout();
    }

    return (
        <>
            <Link to="/">Login</Link>
            <Link to="/signup">Signup</Link>
            <Link to="/"  onClick={logOut}>Logout</Link>
        </>
        
    )
}

export default Menu;