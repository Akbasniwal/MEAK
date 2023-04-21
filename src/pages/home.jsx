import React, { useEffect } from "react";
import Sidebar from "./sidebar";
import Chatbox from "./chatbox";
import cookie from "js-cookie";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = React.useContext(AuthContext);

  useEffect(() => {
    if (
      location.pathname === "/login" ||
      location.pathname === "/register"
    )
      return;
    if (!id) {
      navigate("/login", { replace: true });
    }
  }, [id]);

  return (
    <div className="home">
      <div className="container">
        <Sidebar />
        <Chatbox />
      </div>
    </div>
  );
};

export default Home;
