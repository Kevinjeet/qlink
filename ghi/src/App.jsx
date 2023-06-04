
import { Routes, Route, NavLink } from "react-router-dom";
import "./App.css";
import useToken from "@galvanize-inc/jwtdown-for-react";
import ProfileCard from "./ProfileCard.js";
import useUser from "./useUser.js";
import ProfileView from "./profileView";
import "./style.scss";
import SignUp from "./SignUp";
import Login from "./Login";
import Home from "./Home";
import React from "react";
import ProfileForm from "./ProfileForm"
import ChatsPage from "./Chat";

function App(props) {
  const { token, logout } = useToken();
  const { user } = useUser(token);



  return (
    <>
      <div>

        {token ? (
          <>
            <div className="navigation">
              <button className="logout-button" onClick={logout}>
                <a href="/signin">Logout</a>
              </button>
              <nav className="nav-links">
                <a className="nav-link" href="/users">List of Profiles</a>
                <a className="nav-link" href="/Chat">My Messages</a>

                <a className="nav-link" href="/users/my_profile">My profile</a>
                <a className="nav-link" href="/edit">Edit Profile</a>
              </nav>
            </div>
          </>
        ) : (
          <>
            <nav className="nav-links">
              <a className="nav-link" href="/signin">Login</a>
              <a className="nav-link" href="/">Sign Up Here!</a>
            </nav>
          </>
        )}
      </div>

      <Routes>
        <Route path="/" element={<SignUp user={user} />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/Chat" element={<Home />} />
        <Route path="/users" element={<ProfileCard user={user} />} />
        <Route path="users/:username" element={<ProfileView user={user} />} />
        <Route path="/edit" element={<ProfileForm user={user} token={token} />} />
        <Route path="/page" element={<ChatsPage user={user} />} />

      </Routes>


    </>
  );
}

export default App;
