import React, { useEffect, useState } from "react";
import Sidebar from "./sidebar";
import Chatbox from "./chatbox";
import cookie from "js-cookie";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = React.useContext(AuthContext);
  const [ws, setWs] = useState(null);
  const [onlinePeople, setOnlinePeople] = useState({});
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:4500");
    setWs(ws);
    ws.addEventListener("message", HandleMessage);
  }, []);

  useEffect(() => {
    if (location.pathname === "/login" || location.pathname === "/register")
      return;
    if (!id) {
      navigate("/login", { replace: true });
    }
  }, [id]);

  useEffect(() => {
    const HOST = "http://localhost:4500";
    if (currentChat) {
      axios.get(`${HOST}/messages/` + currentChat[0]).then((res) => {
        setMessages(res.data);
      });
    }
  }, [currentChat]);

  function showOnline(data) {
    const people = {};
    data.forEach((item) => {
      if ("userId" in item && item.userId !== id) {
        people[item.userId] = item.username;
      }
    });
    setOnlinePeople(people);
  }

  function HandleMessage(e) {
    const mdata = JSON.parse(e.data);
    if ("online" in mdata) {
      showOnline(mdata.online);
    } else if ("message" in mdata) {
      setMessages((messages) => [mdata.message].concat(messages));
    }
  }

  return (
    <div className="home">
      <div className="container">
        <Sidebar
          people={onlinePeople}
          SetCurrentChat={setCurrentChat}
          currentChat={currentChat}
        />
        <Chatbox
          currentChat={currentChat}
          ws={ws}
          messages={messages}
          setMessages={setMessages}
        />
      </div>
    </div>
  );
};

export default Home;
