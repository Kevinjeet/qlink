import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";

function Auth() {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  const { token, register, login } = useToken();

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

  const isSignIn = location.pathname.includes("signin");

  const handleSubmit = () => {
    if (isSignIn) {
      login(formData.username, formData.password, formData.email);
    } else {
      register(formData, `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/users`);
    }
  };

  const { username = "", password = "" , email = "" } = formData;
  return token ? null : (
    <div>
      <ul>
        <li>
          username{" "}
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleFormChange}
          />
        </li>
        <li>
          password{" "}
          <input
            type="text"
            name="password"
            value={password}
            onChange={handleFormChange}
          />
          </li>
        <li>
          email{" "}
          <input
            type="text"
            name="email"
            value={email}
            onChange={handleFormChange}
          />
        </li>
      </ul>
      <button onClick={handleSubmit}>{isSignIn ? "Login" : "Sign Up"}</button>
    </div>
  );
}

export default Auth;
