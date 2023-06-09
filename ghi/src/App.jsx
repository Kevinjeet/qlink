import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import useToken from "@galvanize-inc/jwtdown-for-react";
import ProfileCard from "./ProfileCard.js";
import useUser from "./useUser.js";
import ProfileView from "./profileView";
import "./style.scss";
import SignUp from "./SignUp";
import Login from "./Login";
import React, { useEffect, useState } from "react";
import ProfileForm from "./ProfileForm";
import ChatsPage from "./ChatsPage";
import OtherProfile from "./otherProfile";
import { NavLink } from "react-router-dom";


function App(props) {
  const { token, logout, fetchWithToken } = useToken();
  const { user } = useUser(token);
  const [userInfo, setUserInfo] = useState();
  const navigate = useNavigate();

  const refreshUserInfo = async () => {
    if (user && user.username) {
      const response = await fetchWithToken(
        `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/users/${user.username}`
      );
      setUserInfo(response);
    }
  };

  useEffect(() => {
    console.log("app", token)
    if (token) {
      refreshUserInfo();
      console.log("user info refresh")
    }
    const timer =setTimeout(() => {
    console.log("timer")
    if (!token) {
      console.log("no token?")
      navigate('/signin')
    }
    }, 4000);

    return () => clearTimeout(timer);

  }, [token, user]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <div>
        {token ? (
          <>
            <div className="navigation">
              <button className="logout-button" onClick={logout}>
                <NavLink to="/signin">Logout</NavLink>
              </button>
              <nav className="nav-links">
                <NavLink className="nav-link" to="/users">
                  List of Profiles
                </NavLink>
                <NavLink className="nav-link" to="/chat">
                  My Messages
                </NavLink>

                <NavLink className="nav-link" to="/users/my_profile">
                  My profile
                </NavLink>
                <NavLink className="nav-link" to="/edit">
                  Edit Profile
                </NavLink>
              </nav>
            </div>
          </>
        ) : (
            <>
            <div className="navigation">
            <nav className="nav-links">
              <NavLink className="nav-link" to ="/signin">Login</NavLink>
              <NavLink className="nav-link" to ="/">Sign Up Here!</NavLink>
            </nav>
            </div>
          </>
        )}
      </div>

      <Routes>
        <Route path="/" element={<SignUp user={user} />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/chat" element={<ChatsPage user={user} />} />
        <Route
          path="/users"
          element={
            <ProfileCard refreshUserInfo={refreshUserInfo} user={userInfo} />
          }
        />
        <Route path="users/:username" element={<ProfileView user={user} />} />
        <Route path="users/:username/view_profile" element={<OtherProfile/>}/>
        <Route
          path="/edit"
          element={<ProfileForm user={user} token={token} />}
        />
      </Routes>
    </>
  );
}

export default App;
