import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
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
  const location = useLocation();

  const refreshUserInfo = async () => {
    if (user && user.username) {
      const response = await fetchWithToken(
        `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/users/${user.username}`
      );
      setUserInfo(response);
    }
  };
  const click = () => {
    logout();
    const timer = setTimeout(() => {
      navigate("/signin");
    }, 500);
    return () => clearTimeout(timer);
  };

  useEffect(() => {
    console.log("app", token);
    if (token) {
      refreshUserInfo();
    } else if (location.pathname.includes("user")) {
      const timer = setTimeout(() => {
        if (!token) {
          navigate("/signin");
        }
      }, 5000);
      return () => clearTimeout(timer);
    }

  }, [token, user]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <div>
        {token ? (
          <>
            <div className="navigation">
              <button className="logout-button" onClick={click}>
                Logout
              </button>
              <nav className="nav-links">
                <NavLink className="nav-link" to="/users">
                  List of Profiles
                </NavLink>
                <NavLink className="nav-link" to="/users/chat">
                  My Messages
                </NavLink>

                <NavLink className="nav-link" to="/users/my_profile">
                  My profile
                </NavLink>
                <NavLink className="nav-link" to="/users/my_profile/edit">
                  Edit Profile
                </NavLink>
              </nav>
            </div>
          </>
        ) : (
          <>
            <div className="navigation">
              <nav className="nav-links">
                <NavLink className="nav-link" to="/signin">
                  Login
                </NavLink>
                <NavLink className="nav-link" to="/">
                  Sign Up Here!
                </NavLink>
              </nav>
            </div>
          </>
        )}
      </div>

      <Routes>
        <Route path="/" element={<SignUp />} />

        <Route path="/signin" element={<Login />} />
        <Route path="users/chat" element={<ChatsPage user={userInfo} />} />
        <Route
          path="/users"
          element={
            <ProfileCard refreshUserInfo={refreshUserInfo} user={userInfo} />
          }
        />
        <Route
          path="users/:username"
          element={<ProfileView user={userInfo} />}
        />
        <Route path="users/:username/view_profile" element={<OtherProfile />} />
        <Route
          path="/users/my_profile/edit"
          element={<ProfileForm user={userInfo} token={token} />}
        />
      </Routes>
    </>
  );
}

export default App;
