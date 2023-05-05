import React, { useEffect } from "react";
import "../style.scss";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { loginUser, user, id } = React.useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (id) {
      navigate("/", { replace: true });
    }
  }, [id]);
  return (
    <div className="form-container">
      <div className="form-wrapper">
        <form action="" autoComplete="off" onSubmit={loginUser}>
          <center className="MEAK">
            <span style={{ color: "red" }}>ME</span>
            <span style={{ color: "blue" }}>AK</span>
          </center>
          <center className="h3">Login</center>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter Email"
            autoFocus
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter password"
          />
          <a href="/register">Don't have an account?</a>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
