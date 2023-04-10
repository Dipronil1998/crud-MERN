import { Route, Routes } from 'react-router-dom';
import Signup from "./Component/Signup";
import Login from './Component/Login';
import Menu from './Component/Menu';
import Post from './Component/Post';
import Error from './Component/Error';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
      <Menu/>
      <Routes>
        <Route path='/' Component={Login}/>
        <Route path='/signup' Component={Signup}/>
        <Route path='/post' Component={Post}/>
        <Route path="*" Component={Error}/>
      </Routes>
    </>
  );
}

export default App;
