import React from "react";
import "../style.scss";
import {AuthContext} from "../Context/AuthContext";

const Sidebar = () => {
  const {user,logout} = React.useContext(AuthContext);
  const Chats = () => {
    return (
      <div className="chats">
        <div className="chat">
          <img src="https://www.w3schools.com/howto/img_avatar.png" alt="" />
          <div className="content">
            <div className="name">Akbasniwal</div>
            <div className="message">Hello there how you are doing</div>
          </div>
        </div>
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
              src="https://www.w3schools.com/howto/img_avatar.png"
              alt="user-img"
            />
          </div>
        </div>
      </div>
    );
  };

  const Logout = () => {
    return (
      <div className="logout" style={{
        position: "absolute",
        bottom: "10px",
        width: "100%",
      }}>
        <button onClick={logout}>
          Logout
        </button>
      </div>
    );
  };

  return (
    <div className="sidebar">
      <Header />
      <Search />
      <Chats />
      <Logout />
    </div>
  );
};

export default Sidebar;
