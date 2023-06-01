import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "./style.scss";
import SignUp from "./SignUp";
import Login from "./Login";
import Home from "./Home";




function App() {



  return (
    <BrowserRouter>
      <div className="container">
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Chat" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
