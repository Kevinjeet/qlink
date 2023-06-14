import React, { useState, useEffect } from "react";
import "./style.scss";
import { useNavigate, NavLink } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const navigate = useNavigate();
  const { token, login } = useToken();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsDisabled(true);
    await login(username, password);
    setUsername("");
    setPassword("");
  };

  useEffect(() => {
    if (token) {
      navigate("/users");
    }
  }, [token, navigate]);

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">QLink</span>
        <span className="title">Login</span>

        <form onSubmit={handleSubmit}>
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

          <button disabled={isDisabled}>Login</button>
        </form>
        <p>
          You don't have an account? <NavLink to="/">Register</NavLink>
        </p>
      </div>
    </div>
  );
};

export default Login;
