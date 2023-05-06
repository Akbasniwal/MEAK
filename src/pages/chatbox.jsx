import React from "react";
import { BiDotsVertical, BiImageAdd } from "react-icons/bi";
import { BsPersonFillAdd, BsFillCameraVideoFill } from "react-icons/bs";
import { HiArrowLeft } from "react-icons/hi";
import { MdOutlineAttachFile } from "react-icons/md";
import { unionBy, upperCase } from "lodash";
import { BiSend } from "react-icons/bi";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";
import Emoji from "./emoji";

const Chatbox = ({ currentChat, ws, messages, setMessages }) => {
  const imageExts = ["jpg", "jpeg", "png", "webp", "tiff", "svg", "gif"];
  const { id } = React.useContext(AuthContext);
  const Topbar = () => {
    const link = axios.defaults.baseURL + "/uploads/profiles/" + currentChat[2];
    return (
      <div className="topbar">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <img
            src={
              currentChat[2]
                ? link
                : "https://www.w3schools.com/howto/img_avatar.png"
            }
            alt=""
          />
          <div className="name">{currentChat[1]}</div>
        </div>
        <div className="icons">
          <BsFillCameraVideoFill className="icon" />
          <BsPersonFillAdd className="icon" />
          <BiDotsVertical className="icon" />
        </div>
      </div>
    );
  };

  const Bottombar = () => {
    const [sticker, setSticker] = React.useState(0);
    const [message, setMessage] = React.useState("");
    function sendMessage(e, file = null) {
      if (e) e.preventDefault();
      const text = message;
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
    function uploadFile(e) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        sendMessage(null, {
          name: e.target.files[0].name,
          data: reader.result,
        });
      };
    }
    return (
      <form className="bottombar" onSubmit={sendMessage}>
        <div
          className="emoji-abs"
          onClick={() => {
            setSticker(1 - sticker);
          }}
        >
          &#128559;
        </div>
        <div className={!sticker ? "disable" : "enable"}>
          <Emoji
            message={message}
            setMessage={setMessage}
            setSticker={setSticker}
          />
        </div>
        <input
          type="text"
          placeholder="Type a message ..."
          name="message"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          autoFocus
        />
        <div className="icons">
          <label htmlFor="file-input">
            <MdOutlineAttachFile className="icon" />
          </label>
          <input
            id="file-input"
            type="file"
            style={{ display: "none" }}
            name="file"
            onChange={uploadFile}
          />
          <BiImageAdd className="icon" />
          <label htmlFor="submit">
            <BiSend className="icon" />
          </label>
          <button type="submit" id="submit" style={{ display: "none" }} />
        </div>
      </form>
    );
  };

  const Message = ({ type, Message, time, file }) => {
    function renderFile() {
      const link = axios.defaults.baseURL + "/uploads/" + file;
      if (imageExts.includes(file.split(".")[1])) {
        return <img src={link} alt={file} />;
      } else {
        return (
          <div className="file">
            <a href={link} alt="" target="_blank">
              {file}
            </a>
            <div>{upperCase(file.split(".")[1])}</div>
          </div>
        );
      }
    }
    return (
      <div className={`message ${type}`}>
        <div className="time">{time.toString().substring(11, 16)}</div>
        <div className="message-text">
          {file && <>{renderFile()}</>}
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
                  file={message.file}
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
