import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import chatApi from "../api/chatApi";

const socket = io("http://localhost:5001");

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesRef = useRef(null); 

  useEffect(() => {
    loadMessages();

    socket.on("new_message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.off("new_message");
    };
  }, []);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);

  const loadMessages = async () => {
    try {
      const response = await chatApi.getMessages(parseInt(localStorage.getItem('account_id'), 10));
      setMessages(response.data);
      if (messagesRef.current) {
        messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
      }
    } catch (error) {
      console.error("Failed to load messages:", error);
    }
  };

  const sendMessage = async () => {
    const messageData = {
      buyer_id: parseInt(localStorage.getItem('account_id'), 10),
      content: newMessage,
      role: localStorage.getItem('role'),
    };

    await chatApi.sendMessages(messageData);
    setNewMessage("");
  };

  return (
    <>
      <Header />
      <div className="background-chatbox">
        <div id="chat-container" style={{ marginTop: "150px" }}>
          <div id="chat-box">
            <h2 className="helle2">Liên hệ với Cosmic Store</h2>
            <div
              id="messages"
              ref={messagesRef} 
              style={{
                height: "300px",
                overflowY: "scroll",
                border: "1px solid #ccc",
                padding: "10px",
              }}
            >
              {messages.map((msg, index) => {
                const messageClass = msg.serder ? "seller-message" : "buyer-message";
                const senderName = msg.serder ? "Shop" : "Bạn";
                
                return (
                  <div key={index} className={`${messageClass} min-width-message messages-chatbox`} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    {msg.serder && (
                      <img
                        src={`${process.env.PUBLIC_URL}/images/avatar-shop.jpg`}
                        alt={senderName}
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                          marginRight: "10px",
                        }}
                      />
                    )}
                    <div>
                      <strong>{senderName}</strong>: {msg.content}{" "}
                      <span className="timestamp">{msg.timestamp}</span>
                    </div>
                  </div>
                );
              })}
            </div>
            <div id="input-area" style={{ marginTop: "10px" }}>
              <input
                type="text"
                id="message-input"
                placeholder="Nhập tin nhắn..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                style={{ width: "70%", padding: "10px" }}
              />
              <button
                id="send-button"
                onClick={sendMessage}
                style={{ padding: "10px" }}
              >
                <i className="fas fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Chat;
