import { Route, Routes } from "react-router-dom";
import Signup from "./Component/Signup";
import Login from "./Component/Login";
import Menu from "./Component/Menu";
import Post from "./Component/Post";
import Edit from "./Component/Edit";
import Lists from "./Component/Lists";
import Error from "./Component/Error";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Protected from "./Route/Protected";
import { useEffect, useState } from "react";
import AuthService from "./Service/AuthService";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    console.log(user, "user");
    if (user !== null) {
      setIsLoggedIn(true);
      console.log("AA", isLoggedIn);
    } else {
      setIsLoggedIn(false);
      console.log("BB", isLoggedIn);
    }
  }, []);

  return (
    <>
      <Menu />
      <Routes>
        <Route path="/" Component={Lists} />
        <Route path="/login" Component={Login} />
        <Route path="/signup" Component={Signup} />
        <Route
          path="/post"
          element={
            <Protected isLoggedIn={isLoggedIn}>
              <Post />
            </Protected>
          }
        />
        <Route
          path="/post/:id"
          element={
            <Protected isLoggedIn={isLoggedIn}>
              <Edit />
            </Protected>
          }
        />
        <Route path="*" Component={Error} />
      </Routes>
    </>
  );
}

export default App;
