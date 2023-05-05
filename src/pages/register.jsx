import React, { useState, useEffect } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imgData, setImgData] = useState("");
  const { registerUser, user, id } = React.useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      navigate("/", { replace: true });
    }
  }, [user]);

  return (
    <div className="form-container">
      <div className="form-wrapper">
        <form action="" autoComplete="off" onSubmit={registerUser}>
          <center className="MEAK">
            <span style={{ color: "red" }}>ME</span>
            <span style={{ color: "blue" }}>AK</span>
          </center>
          <center className="h3">Register</center>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter Username"
            autoFocus
          />
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email"
          />
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
          <label htmlFor="file">Upload Avtar</label>
          <input
            style={{ display: "none" }}
            name="avtar"
            type="file"
            id="file"
          />
          <a href="/login">Already have an account?</a>
          <button type="submit">SignUp</button>
        </form>
      </div>
    </div>
  );
}
