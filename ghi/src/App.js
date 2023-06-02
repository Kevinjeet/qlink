
import { Routes, Route, NavLink } from "react-router-dom";
import "./App.css";
import useToken from "@galvanize-inc/jwtdown-for-react";
import ProfileCard from "./ProfileCard.js";
import useUser from "./useUser.js";
import ProfileView from "./profileView";
import ProfileForm from "./ProfileForm";
import "./style.scss";
import SignUp from "./SignUp";
import Login from "./Login";
import Home from "./Home";
import React from "react";

function App(props) {
  const { token, logout } = useToken();
  const { user } = useUser(token);



  return (
    <>
      <div
          style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          width: "80%",
          margin: "auto",
        }}>

        {user ? (
          <>
            <button onClick={logout}><a href="/signin">Logout</a></button>
            <NavLink to="/users">List of Profiles</NavLink>
            <NavLink to="users/my_profile">Your profile</NavLink>
            <NavLink to="/edit">Edit Profile</NavLink>
          </>
        ) : (
          <>
            <NavLink to="/signin">Login</NavLink>
            <NavLink to="/">Sign Up</NavLink>
          </>
        )}
      </div>
      <Routes>
        <Route path="/" element={<SignUp user={user} />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/Chat" element={<Home />} />
        <Route path="/users" element={<ProfileCard />} />
        <Route path="users/:username" element={<ProfileView user={user}/>}/>
        <Route path="/edit" element={<ProfileForm user={user} token={token} />}/>
      </Routes>
    </>
  );
}

export default App;
