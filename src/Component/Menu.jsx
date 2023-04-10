import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthService from "../Service/AuthService";

const Menu = () => {
    // const isLogin = localStorage.getItem("user");
    const [currentUser, setCurrentUser] = useState(null)

    const logOut = () => {
        AuthService.logout();
        setCurrentUser(null)
    }

    useEffect(() => {
        const currentUser = localStorage.getItem("user");
        console.log(currentUser, "isLogin");
        setCurrentUser(currentUser)
    })

    return (
        <> 
            {
                currentUser 
                ? <Link to="/"  onClick={logOut}>Logout</Link>
                : (
                    <>
                        <Link to="/">Login</Link>
                        <Link to="/signup">Signup</Link>
                    </>
                )
            }
            
        </>
        
    )
}

export default Menu;