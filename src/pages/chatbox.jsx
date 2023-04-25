import React, { useEffect, useRef } from "react";
import { BiDotsVertical, BiLink, BiImageAdd } from "react-icons/bi";
import {
  BsPersonFillAdd,
  BsFillCameraVideoFill,
  BsFillSendFill,
} from "react-icons/bs";
import { HiArrowLeft } from "react-icons/hi";
import { AuthContext } from "../Context/AuthContext";
import { times, unionBy } from "lodash";

const Chatbox = ({ currentChat, ws, messages, setMessages }) => {
  const { id } = React.useContext(AuthContext);
  const Topbar = () => {
    return (
      <div className="topbar">
        <div className="name">{currentChat[1]}</div>
        <div className="icons">
          <BsFillCameraVideoFill className="icon" />
          <BsPersonFillAdd className="icon" />
          <BiDotsVertical className="icon" />
        </div>
      </div>
    );
  };

  const Bottombar = () => {
    const [message, setMessage] = React.useState("");
    function sendMessage(e) {
      e.preventDefault();
      const text = message;
      const file = e.target.image.value;
      setMessage("");
      if (!text && !file) return;
      ws.send(
        JSON.stringify({
          message: {
            receiver: currentChat[0],
            text: text,
            file: file,
          },
        })
      );
    }
    return (
      <form className="bottombar" onSubmit={sendMessage}>
        <input
          type="text"
          placeholder="Type a message ..."
          name="message"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        <div className="icons">
          <label htmlFor="file-input">
            <BiLink className="icon" />
          </label>
          <input
            id="file-input"
            type="file"
            style={{ display: "none" }}
            name="image"
          />
          <BiImageAdd className="icon" />
          <BsFillSendFill className="icon" />
        </div>
      </form>
    );
  };

  const Message = ({ type, Message, time }) => {
    return (
      <div className={`message ${type}`}>
        <div className="time">{time.toString().substring(11, 16)}</div>
        <div className="message-text">
          {/* <img
            src="https://th.bing.com/th/id/OIP.NbfPECA64xbFnmW58MbWDQHaEo?w=280&h=180&c=7&r=0&o=5&pid=1.7"
            alt=""
          /> */}
          <p>{Message}</p>
        </div>
      </div>
    );
  };
  return (
    <div className="chatbox">
      {!currentChat && (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              fontSize: "2rem",
              color: "#ccc",
              backgroundColor: "#666ec3",
            }}
          >
            <HiArrowLeft />
            Select a chat to start messaging
          </div>
        </>
      )}
      {currentChat && (
        <>
          <Topbar />
          <div className="messages">
            {unionBy(messages, "_id").map((message, index) => {
              return (
                <Message
                  key={index}
                  type={message.sender == id ? "send" : "receive"}
                  Message={message.text}
                  time={message.createdAt}
                />
              );
            })}
          </div>
          <Bottombar />
        </>
      )}
    </div>
  );
};

export default Chatbox;
