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
  const [offlinePeople, setOfflinePeople] = useState({});
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  // const HOST = "https://meak-server-akbasniwal.vercel.app";
  const HOST = "http://localhost:5000";

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:5000", "echo-protocol");
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
    if (currentChat) {
      axios.get(`${HOST}/messages/` + currentChat[0]).then((res) => {
        setMessages(res.data);
      });
    }
  }, [currentChat]);

  useEffect(() => {
    axios.get(`${HOST}/people`).then((res) => {
      const offline = res.data
        .filter((item) => {
          return item._id !== id;
        })
        .filter((item) => {
          return !Object.keys(onlinePeople).includes(item._id);
        });
      const offlineP = {};
      offline.forEach((item) => {
        offlineP[item._id] = {
          username: item.username,
          avtar: item.profilePicture,
        };
      });
      setOfflinePeople(offlineP);
    });
  }, [onlinePeople]);

  function showOnline(data) {
    const people = {};
    data.forEach((item) => {
      if ("userId" in item && item.userId !== id) {
        people[item.userId] = {
          username: item.username,
          avtar: item.profilePicture,
        };
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
          offline={offlinePeople}
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
