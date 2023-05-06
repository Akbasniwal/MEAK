import axios from "axios";
import React from "react";

export default function Person({ avtar, online, name }) {
  const link = axios.defaults.baseURL + "/uploads/profiles/" + avtar;
  // console.log(link);
  return (
    <>
      <div className="avtar">
        <div className={`indicator ${online ? "online" : ""}`}></div>
        <img
          src={avtar ? link : "https://www.w3schools.com/howto/img_avatar.png"}
          alt=""
        />
      </div>
      <div className="content">
        <div className="name">{name}</div>
        <div className="message">Hello there how you are doing</div>
      </div>
    </>
  );
}
