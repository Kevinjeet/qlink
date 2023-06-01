import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "./style.scss";
import SignUp from "./SignUp";
import Login from "./Login";
import Home from "./Home";
import useToken from "@galvanize-inc/jwtdown-for-react";
import useUser from "./useUser.js"



function App(props) {
  const { token, logout } = useToken();
  const { user } = useUser(token);



  return (
        <Routes>
          <Route path="/" element={<SignUp />} />

          <Route path="/signin" element={<Login />} />
          <Route path="/Chat" element={<Home />} />
        </Routes>
  );
}

export default App;
