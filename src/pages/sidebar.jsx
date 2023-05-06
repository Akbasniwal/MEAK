import React from "react";
import "../style.scss";
import { AuthContext } from "../Context/AuthContext";
import Person from "./person";
import axios from "axios";

const Sidebar = ({ offline, people, currentChat, SetCurrentChat }) => {
  const { avtar, user, logout } = React.useContext(AuthContext);
  const Chats = () => {
    return (
      <div className="chats">
        {Object.keys(offline).map((key) => {
          return (
            <div
              key={key}
              onClick={() => {
                SetCurrentChat([key, offline[key].username]);
              }}
              className={`chat ${
                currentChat && currentChat[0] === key ? "current-chat" : ""
              }`}
            >
              <Person
                online={false}
                name={offline[key].username}
                avtar={offline[key].avtar}
              />
            </div>
          );
        })}
        {Object.keys(people).map((key) => {
          return (
            <div
              key={key}
              onClick={() => {
                SetCurrentChat([key, people[key].username]);
              }}
              className={`chat ${
                currentChat && currentChat[0] === key ? "current-chat" : ""
              }`}
            >
              <Person
                online={true}
                name={people[key].username}
                avtar={people[key].avtar}
              />
            </div>
          );
        })}
      </div>
    );
  };
  const Search = () => {
    return (
      <div className="search">
        <div className="search-form">
          <input type="text" placeholder="Find User" />
        </div>
        <div className="search-user">
          <img src="https://www.w3schools.com/howto/img_avatar.png" alt="" />
          <span>Username</span>
        </div>
      </div>
    );
  };
  const Header = () => {
    const link = axios.defaults.baseURL + "/uploads/profiles/" + avtar;
    return (
      <div className="header">
        <div className="logo">
          <span style={{ color: "red" }}>ME</span>
          <span style={{ color: "blue" }}>AK</span>
        </div>
        <div className="user">
          <div className="user-name">
            <span>{user}</span>
          </div>
          <div className="user-img">
            <img
              src={
                avtar ? link : "https://www.w3schools.com/howto/img_avatar.png"
              }
              alt="user-img"
            />
            <form className="avtar">
              <label htmlFor="file">Change Avtar</label>
              <input
                type="file"
                name="file"
                id="file"
                style={{ display: "none" }}
                onChange={(e) => {
                  const reader = new FileReader();
                  reader.readAsDataURL(e.target.files[0]);
                  reader.onload = () => {
                    axios
                      .post("/changeAvtar", {
                        name: e.target.files[0].name,
                        avtar: reader.result,
                      })
                      .then((res) => {
                        console.log(res);
                      });
                  };
                }}
              />
            </form>
          </div>
        </div>
      </div>
    );
  };

  const Logout = () => {
    return (
      <div
        className="logout"
        style={{
          position: "absolute",
          bottom: "10px",
          width: "100%",
        }}
      >
        <button onClick={logout}>Logout</button>
      </div>
    );
  };

  return (
    <div className="sidebar">
      <Header />
      {/* <Search /> */}
      <Chats />
      <Logout />
    </div>
  );
};

export default Sidebar;
