import React from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

import "./App.css";
// import ListProfiles from "./ListProlfies.js";
// import LoginForm from "./LoginForm.js";
import useToken from "@galvanize-inc/jwtdown-for-react";
import Auth from "./Auth";
import ProfileCard from "./PofileCard.js";
import useUser from "./useUser.js";

function App() {
  const { token, logout } = useToken();
  const { user } = useUser(token);



  return (
    <>
      <div>

        {user ? (
          <>
            <button onClick={logout}>Log off</button>
          </>
        ) : (
          <>
            <NavLink to="/signin">Login</NavLink>
            <NavLink to="/signup">Sign Up</NavLink>
          </>
        )}
      </div>
      <NavLink to="/users">List of Pofiles</NavLink>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/signup" element={<Auth />} />
        <Route path="/signin" element={<Auth />} />
        <Route path="/users" element={<ProfileCard />} />

      </Routes>


    </>
  );
}

export default App;
