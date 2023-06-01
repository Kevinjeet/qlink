import React, { useEffect, useState } from "react";
import "./style.scss";
import { useNavigate, useLocation } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";
import "./style.scss";




const Login = () => {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  const { token, login } = useToken();

  useEffect(() => {
    if (token) {
      navigate("/users");
    }
  }, [token, navigate]);

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const isSignIn = location.pathname.includes("signin");

  const handleSubmit = () => {
      e.preventDefault();
    if (isSignIn) {
      login(formData.password, formData.email);
    }
    }


  const { email = "" , password = "" } = formData;
  return token ? null : (
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">QLink</span>
                <span className="title">Login</span>

                <form onSubmit={handleSubmit}>
                    <input type="email" name="email" value={email} placeholder="email" onChange={handleFormChange} />
                    <input type="password" name="password" value={password} placeholder="password" onChange={handleFormChange} />

                    <button type="submit">Sign in</button>


                </form>
                <p>You don't have an account? Register</p>
            </div>
        </div>
    );
};

export default Login;