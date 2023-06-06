import { Routes, Route, NavLink } from "react-router-dom";
import "./App.css";
import useToken, { getToken } from "@galvanize-inc/jwtdown-for-react";
import ProfileCard from "./ProfileCard.js";
import useUser from "./useUser.js";
import ProfileView from "./profileView";
import "./style.scss";
import SignUp from "./SignUp";
import Login from "./Login";
import Home from "./Home";
<<<<<<< HEAD
import React from "react";
import ProfileForm from "./ProfileForm"
import ChatsPage from "./Chat";
=======
import React, { useEffect, useState } from "react";
import ProfileForm from "./ProfileForm";
// import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
>>>>>>> 9588de9dcdd3ca5990b3939e10cfa61125425041

function App(props) {
  const { token, logout, fetchWithToken } = useToken();
  const { user } = useUser(token);
  const [userInfo, setUserInfo] = useState();

  const refreshUserInfo = async () => {
    if (user && user.username) {
      const response = await fetchWithToken(
        `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/users/${user.username}`
      );
      setUserInfo(response);
    }
  };

  useEffect(() => {
    if (token) {
      refreshUserInfo();
    }
  }, [token, user]);

  return (
    <>
      <div>
<<<<<<< HEAD

=======
>>>>>>> 9588de9dcdd3ca5990b3939e10cfa61125425041
        {token ? (
          <>
            <div className="navigation">
              <button className="logout-button" onClick={logout}>
                <a href="/signin">Logout</a>
              </button>
              <nav className="nav-links">
<<<<<<< HEAD
                <a className="nav-link" href="/users">List of Profiles</a>
                <a className="nav-link" href="/Chat">My Messages</a>
=======
                <a className="nav-link" href="/users">
                  List of Profiles
                </a>
                <a className="nav-link" href="/chat">
                  My Messages
                </a>
>>>>>>> 9588de9dcdd3ca5990b3939e10cfa61125425041

                <a className="nav-link" href="/users/my_profile">
                  My profile
                </a>
                <a className="nav-link" href="/edit">
                  Edit Profile
                </a>
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
<<<<<<< HEAD
        <Route path="/users" element={<ProfileCard user={user} />} />
        <Route path="users/:username" element={<ProfileView user={user} />} />
        <Route path="/edit" element={<ProfileForm user={user} token={token} />} />
        <Route path="/page" element={<ChatsPage user={user} />} />

=======
        <Route
          path="/users"
          element={
            <ProfileCard refreshUserInfo={refreshUserInfo} user={userInfo} />
          }
        />
        <Route path="users/:username" element={<ProfileView user={user} />} />
        <Route
          path="/edit"
          element={<ProfileForm user={user} token={token} />}
        />
>>>>>>> 9588de9dcdd3ca5990b3939e10cfa61125425041
      </Routes>
    </>
  );
}

export default App;
