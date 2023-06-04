import React, { useEffect, useState } from "react";
// import Avatar from "./img/qlinkimg.PNG"
import "./style.scss";
import { useNavigate } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";




const SignUp = () => {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  // const location = useLocation();

  const { token, login, register } = useToken();

  useEffect(() => {
    if (token) {
      navigate("/users");
    }
  }, [token]);

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // const isSignIn = location.pathname.includes("signin");

  const handleSubmit = () => {
    register(formData, `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/users`);
    login(formData.username, formData.password);
    navigate("/users");


    }

    const { username = "", first_name = "", last_name = "", email = "", password = "", date_of_birth = "", phone_number = "", interests = "", gender = "", profile_picture_url = "", other_picture = "", pronouns = "", location = "", looking_for = "", about_me = "", matches = "", messages = "" } = formData;
    return token ? null : (
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">QLink</span>
                <span className="title">Register</span>

                <form onSubmit={handleSubmit}>
                    <input type="text" name="username" value={username} placeholder="username" onChange={handleFormChange} />
                    <input type="text" name="first_name" value={first_name} placeholder="first name" onChange={handleFormChange} />
                    <input type="text" name="last_name" value={last_name} placeholder="last name" onChange={handleFormChange} />
                    <input type="text" name="gender" value={gender} placeholder="gender" onChange={handleFormChange} style={{display: 'none'}} />


                    <input type="email" name="email" value={email} placeholder="email" onChange={handleFormChange} />
                    <input type="password" name="password" value={password} placeholder="password" onChange={handleFormChange} />

                    <label htmlFor="DOB">DOB</label>
                    <input type="date" name="date_of_birth" value={date_of_birth} id="DOB" onChange={handleFormChange} />
                    <input type="tel" name="phone_number" value={phone_number} placeholder="phone number" onChange={handleFormChange} />

                    {/* <input style={{display:"none"}} name="file" type="file" id="file" onChange={handleFormChange} />
                    <label htmlFor="file">
                        <img width="40" height='40' src={Avatar} alt="" />
                        <span>Add an Avatar</span>
                    </label> */}
                    <button onClick={handleSubmit}>Sign Up</button>


                </form>
                <p>Do you have an account already? <a href="/signin">Login</a></p>
            </div>
        </div>
    );
};

export default SignUp;