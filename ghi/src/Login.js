import React, { useState } from "react";
import "./style.scss";
import { useNavigate, useLocation } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { token, login } = useToken();

  const isSignIn = location.pathname.includes("signin");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSignIn) {
      await login(username, password);
      console.log("first", token);
      navigate("/users");
      console.log({ username, password });
    }
  };

  return token ? null : (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">QLink</span>
        <span className="title">Login</span>

        <form>
          <input
            type="text"
            name="username"
            value={username}
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            name="password"
            value={password}
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button onClick={handleSubmit}>Login</button>
        </form>
        <p>
          You don't have an account? <a href="/">Register</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
