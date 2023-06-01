import React from "react";
import Avatar from "./img/qlinkimg.PNG"
import "./style.scss";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";




const SignUp = () => {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  const { token, register } = useToken();

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
      register(formData, `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/users`);
    }
  };

    const { username = "", firstName = "", lastName = "", email = "", password = "", DOB = "", phoneNumber = "" } = formData;
    return token ? null : (
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">QLink</span>
                <span className="title">Register</span>

                <form onSubmit={handleSubmit}>
                    <input type="text" name="username" value={username} placeholder="username" onChange={handleFormChange} />
                    <input type="text" name="first name" value={firstName} placeholder="first name" onChange={handleFormChange} />
                    <input type="text" name="last name" value={lastName} placeholder="last name" onChange={handleFormChange} />


                    <input type="email" name="email" value={email} placeholder="email" onChange={handleFormChange} />
                    <input type="password" name="password" value={password} placeholder="password" onChange={handleFormChange} />

                    <label htmlFor="DOB">DOB</label>
                    <input type="date" name="DOB" value={DOB} id="DOB" onChange={handleFormChange} />
                    <input type="tel" name="phone number" value={phoneNumber} placeholder="phone number" onChange={handleFormChange} />

                    <input style={{display:"none"}} name="file" type="file" id="file" onChange={handleFormChange} />
                    <label htmlFor="file">
                        <img width="40" height='40' src={Avatar} alt="" />
                        <span>Add an Avatar</span>
                    </label>
                    <button type="submit">Sign Up</button>


                </form>
                <p>Do you have an account already? <a href="/Login">Login</a></p>
            </div>
        </div>
    );
};

export default SignUp;