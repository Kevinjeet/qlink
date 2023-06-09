import React, { useState } from "react";
import "./style.scss";
import { useNavigate, useLocation } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";
import "./style.scss";

const Login = () => {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const { token, login } = useToken();

  // useEffect(() => {


  // }, [token, navigate]);

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const isSignIn = location.pathname.includes("signin");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSignIn) {
      await login(formData.username, formData.password);
      console.log("first", token)
      navigate("/users");
      console.log(formData);
    }

    }


  const { username = "" , password = "" } = formData;
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
                    onChange={handleFormChange}
                    />
                    <input
                    type="password"
                    name="password"
                    value={password}
                    placeholder="password"
                    onChange={handleFormChange}
                    />

                    <button onClick={handleSubmit}>Login</button>


                </form>
                <p>You don't have an account?<a href="/">Register</a></p>
            </div>
        </div>
    );
};

export default Login;
