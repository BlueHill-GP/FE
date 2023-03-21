import React, { useState, useEffect } from "react";
import { socket } from "../../App";
import "./style.css";
interface Post {
  id: number;
  title: string;
  content: string;
}

function ChatBox() {
  const [userId, setUserId] = useState("");
  const [partnerId, setPartnerId] = useState("");
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    socket.emit("send-message", {message});
    console.log(message);
    
  };

  return (
    <div className="chat-box">
      {/* <div>
        <input
          type="text"
          placeholder="Partner User ID"
          value={partnerId}
          onChange={(e) => setPartnerId(e.target.value)}
        />
          </div>
          <div className="">
        <input
          type="text"
          placeholder="send message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={() => sendMessage()}>Sent mess</button>
      </div> */}
    </div>
  );
}

export default ChatBox;
