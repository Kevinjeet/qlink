import React from "react";
import { Routes, Route, NavLink } from "react-router-dom";


import "./App.css";
// import ListProfiles from "./ListProlfies.js";
import LoginForm from "./LoginForm.js";
import useToken from "@galvanize-inc/jwtdown-for-react";
import Auth from "./Auth";
import ProfileCard from "./ProfileCard.js";
import useUser from "./useUser.js";
import ProfileView from "./profileView";

function App(props) {
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
      <NavLink to="users/my_profile">Your profile</NavLink>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/signup" element={<Auth />} />
        <Route path="/signin" element={<Auth />} />
        <Route path="/users" element={<ProfileCard />} />
        <Route path="users/:username" element={<ProfileView user={user}/>}/>
      </Routes>


    </>
  );
}

export default App;
