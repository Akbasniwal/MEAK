import React from 'react'
import {BiDotsVertical,BiLink,BiImageAdd} from 'react-icons/bi'
import {BsPersonFillAdd,BsFillCameraVideoFill,BsFillSendFill} from 'react-icons/bs'

const Topbar = () => {
  return (
    <div className="topbar">
      <div className="name">Saksham</div>
      <div className="icons">
        <BsFillCameraVideoFill className="icon"/>
        <BsPersonFillAdd className="icon"/>
        <BiDotsVertical className="icon"/>
      </div>
    </div>
  );
}

const Bottombar = () => {
  return (
    <div className="bottombar">
      <input type="text" placeholder="Type a message ..."/>
      <div className="icons">
        {/* <BiImageAdd className="icon"/> */}
        <label htmlFor="file-input"><BiLink className="icon"/></label>
        <input id="file-input" type="file" style={{display : "none"}}/>
        <BiImageAdd className="icon"/>
        <BsFillSendFill className="icon"/>
      </div>
    </div>
  );
}

const Message = ({type,Message}) => {
  return (
    <div className={`message ${type}`}>
      <div className="time">
        10:00
      </div>
      <div className="message-text">
        <img src="https://th.bing.com/th/id/OIP.NbfPECA64xbFnmW58MbWDQHaEo?w=280&h=180&c=7&r=0&o=5&pid=1.7" alt="" />
        <p>{Message}</p>
      </div>
    </div>
  );
}

const Chatbox = () => {
  return (
    <div className="chatbox">
      <Topbar />
      <div className="messages">
        <Message type={"receive"} Message={"HI checkout this image"}/>
        <Message type={"send"} Message={"It looks good"}/>
        <Message type={"receive"} Message={"Ho wyou are here today"}/>
        <Message type={"send"}/>
        <Message type={"receive"}/>
        <Message type={"send"}/>
        <Message type={"receive"}/>
        <Message type={"send"}/>
        <Message type={"receive"}/>
        <Message type={"send"}/>
        <Message type={"receive"}/>
      </div>
      <Bottombar />
    </div>
  )
}

export default Chatbox
