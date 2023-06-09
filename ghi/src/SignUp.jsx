import React, { useEffect, useState } from "react";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
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

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Registration failed");
        }
        return res.json();
      })
      .then((data) => {
        login(formData.username, formData.password);
        navigate("/users");
      })
      .catch((error) => {
        console.error("Registration failed:", error);
      });
  };

  const {
    username = "",
    first_name = "",
    last_name = "",
    email = "",
    password = "",
    date_of_birth = "",
    phone_number = "",
  } = formData;
  return token ? null : (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">QLink</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            value={username}
            placeholder="username"
            onChange={handleFormChange}
          />
          <input
            type="text"
            name="first_name"
            value={first_name}
            placeholder="first name"
            onChange={handleFormChange}
          />
          <input
            type="text"
            name="last_name"
            value={last_name}
            placeholder="last name"
            onChange={handleFormChange}
          />
          <input
            type="email"
            name="email"
            value={email}
            placeholder="email"
            onChange={handleFormChange}
          />
          <input
            type="password"
            name="password"
            value={password}
            placeholder="password"
            onChange={handleFormChange}
          />
          <label htmlFor="DOB">DOB</label>
          <input
            type="date"
            name="date_of_birth"
            value={date_of_birth}
            id="DOB"
            onChange={handleFormChange}
          />
          <input
            type="tel"
            name="phone_number"
            value={phone_number}
            placeholder="phone number"
            onChange={handleFormChange}
          />
          <button onClick={handleSubmit}>Sign Up</button>
        </form>
        <p>
          Do you have an account already? <a href="/signin">Login</a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
