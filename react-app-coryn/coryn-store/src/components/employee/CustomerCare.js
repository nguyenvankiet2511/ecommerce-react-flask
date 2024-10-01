import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import accountsApi from "../../api/accountsApi";
import chatApi from "../../api/chatApi";
import HeaderEmployee from "../layout/HeaderEmployee";
import FooterEmployee from "../layout/FooterEmployee";

// Khởi tạo kết nối socket một lần duy nhất
const socket = io("http://localhost:5001");

const CustomerCare = () => {
  const [messages, setMessages] = useState([]); // Trạng thái lưu trữ tin nhắn
  const [newMessage, setNewMessage] = useState(""); // Trạng thái lưu trữ tin nhắn mới
  const [buyerId, setBuyerId] = useState(null); // ID của người mua hiện tại
  const [buyerName, setBuyerName] = useState("");
  const [accounts, setAccounts] = useState([]); // Danh sách khách hàng

  const messagesRef = useRef(null); // Sử dụng useRef để quản lý scroll của tin nhắn

  // Fetch danh sách khách hàng
  useEffect(() => {
    const fetchAccounts = async () => {
      const accountsResponse = await accountsApi.getAccountCustomer();
      setAccounts(accountsResponse.data);
    };
    fetchAccounts();
  }, []);

  // Lắng nghe socket sự kiện new_message
  useEffect(() => {
    socket.on("new_message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.off("new_message");
    };
  }, []);

  // Cuộn xuống cuối khung chat khi có tin nhắn mới
  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    loadMessages();
  }, [buyerId]);

  const loadMessages = async () => {
    try {
      const response = await chatApi.getMessages(buyerId);
      setMessages(response.data);
      if (messagesRef.current) {
        messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
      }
    } catch (error) {
      console.error("Failed to load messages:", error);
    }
  };

  const selectChat = (id, name) => {
    setBuyerId(id);
    setBuyerName(name);
  };

  // Xử lý gửi tin nhắn
  const sendMessage = async () => {
    if (buyerId) {
      const messageData = {
        buyer_id: buyerId,
        content: newMessage,
        role: localStorage.getItem("role"),
      };

      await chatApi.sendMessages(messageData);
      setNewMessage("");
    } else {
      alert("Hãy chọn cuộc trò chuyện!");
    }
  };

  return (
    <>
      <HeaderEmployee>
        <section className="order-overview-emp">
          <h1 className="container-h1-emp">PHẢN HỒI KHÁCH HÀNG</h1>
          <p className="description-emp">
            Tại đây bạn có thể quản lý tất cả tài khoản người dùng.
          </p>
        </section>
        <div id="chat-container" style={{ display: "flex" }}>
          <div id="sidebar-chat" style={{ flex: 1, marginRight: "20px" }}>
            <h3>Danh sách Chat</h3>
            <ul className="chat-list" id="chat-list">
              {accounts.map((account) => (
                <li
                  key={account.id}
                  onClick={() => selectChat(account.account_id, account.name)}
                >
                  {account.name}
                </li>
              ))}
            </ul>
          </div>

          {/* Khung chat */}
          <div id="chat-box" style={{ flex: 2 }}>
            <h2>Chat Khách Hàng</h2>
            <div
              id="messages"
              ref={messagesRef}
              style={{
                height: "300px",
                overflowY: "scroll",
                border: "1px solid #ccc",
                padding: "10px",
                marginBottom: "10px",
              }}
            >
              {messages.length === 0 ? (
                <div className="no-messages">Hãy liên hệ</div>
              ) : (
                messages.map((msg, index) => {
                  const messageClass = msg.serder
                    ? "buyer-message"
                    : "seller-message";
                  const name = msg.serder
                    ? "Bạn"
                    : buyerName || `Buyer ${msg.buyer_id}`;

                  // Giả sử avatar của người mua được lưu trong buyerAvatar
                  const avatar = accounts.find(
                    (account) => account.account_id === msg.buyer_id
                  )?.avatar;
                  const avatarPath = accounts.find(
                    (account) => account.account_id === msg.buyer_id
                  )?.avatarPath;
                  const defaultAvatar =
                    "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8IDQ0KDgoQCA0ODw4OCAgKCg8ICQgNFREWFhURExMYHSggGBolGxMTITEhJSkuLjouFx8zODMsNygtLisBCgoKDQ0NDw0PECsZFRktKysrKysrKysrKysrLSsrKysrKzctKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAN4A5AMBIgACEQEDEQH/xAAaAAEAAwEBAQAAAAAAAAAAAAAAAQQFAgYD/8QANhABAAECAgcGBAMJAAAAAAAAAAECEQMEBRQhMVFSoRITMkFhcRUiQlNDgZEjM2JjcrHB8PH/xAAWAQEBAQAAAAAAAAAAAAAAAAAAAQL/xAAWEQEBAQAAAAAAAAAAAAAAAAAAEQH/2gAMAwEAAhEDEQA/APeANIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH2y2Vrx52RaPOoHxLtrB0VRT4pmufPgs05TDj8OP0Sjzly70c5TDn8OFfF0ZRX4b4c9CjFH3zOSqy83mO1HND4KAAAAAAAAAAAAAAAAAAAAAIv5AsZLLTmK7fTG2pvYeHGHEUxFoh8dH4HdYcbLTO2pZZVIAAAOK6Iqi0xeJ3sLP5TuKrx4Z3PQK+cwe9omm15+mQedSTFpmOGyRpAAAAAAAAAAAAAAAAAAB3l6O3iUxv27fZws6M/fR7IPQRFosAigAAACLJAecz1HYxa4/N8V3TEWxY9Y2qSoAKAAAAAAAAAAAAAAAACzo3ZjUqzvL4nYrpn12or0wimbxCUAAAAAC4MPTE3xY9I2qT7Z2vvMSqd8XtD4qgAoAAAAAAAAAAAAAAAAIskBuaLx+9otM7adnquvN5XGnAriuN31U+Uw9BgY1ONTFVM39ODKvoFwAC4CppDG7qiZvtnZCxi4sYcXmbQwM7mJx6vSPD6gr3mUoS0gAAAAAAAAAAAAAAAAAACAS+mXzFWXm9M7PqpndL5XSg28tpGjF2T8k8J3LlOJFW6qJ/N5fspiZjzmPaZIr081xG+Yj81XH0hh4Wy/bnhG1hXnmmfeZlFv+kH3zWaqzE7dlPlHB8BK4Ai6RAAAAAAAAAAAAAAAABF0+m/hC/lNGTX81c9mOWN6CjRTNc2piavaLreFozEr32oj12tjCwKcKLU0xH930n/dqKyo0PxxP0h3Gh6fuS0wGZ8Hp+5UfB6fuVNMBmfB6fuVHwen7lTTAZnwePuT+jmdD/zOjVAYWJozEp3T2/bYq14dVG+mafeHprOMTCjEi1VMVA8ylo5vRnZ+aiL/AMMs6YtsmLT5xwVABQAAAAAAAAAAI2/4Q0NFZbtzOJVF4jwwCxo7IdiIxKovVO2In6WjZMF2VAuXAC4AFwAC4AFwAuXBEQoZ/IxixNVOyrhHm0LosDy8xaZidkxvgamlcr+LEbvFDKuqJAUAAAAAAAATh09uqKeL0WDhxhURREbmPorD7WLfg25lNVNy7m5dB1cu5uXB1cu5uXB1cu5uXB1cu5uXB1cu5uXB1cu5uXB1cu5uXAxKYriaZedx8Pu66qOD0V2Rpei1cVcYVFEBQAAAAAAABo6Hjx1NKZZ2iN1fu0JQTcu5BXQi6biAXLqFy6EIroui6AdXLuQHVy7kB1cu5AdXUNLxemmr1suqelZ/Zx/UDKAVAAAAAV9ajhJrUcJBYFfWo4Sa1HLINjRE+OGi89kM9FGJ4ZtMbWvrkcs9EFoVdcjlnoa5HLPQFoVdcjlnoa5HLPQFoVdcjlnoa5HLPQFoVdcjlnoa5HLPQFoVdcjlnoa5HLPQFoVdcjlnoa5HLPQFoVdcjlnoa5HLPQFoVdcjlnoa5HLPQFpR0rPyRHq+muRyz0Zeks9FdXZ7M7NwOBX1qOWTWo4SosCvrUcJNajhILAr61HCQH//2Q==";

                  return (
                    <div
                      key={index}
                      className={`${messageClass} min-width-message messages-chatbox`}
                      style={{
                        display: "flex",
                        alignItems: "flex-start", // Avatar bên ngoài khung tin nhắn
                        marginBottom: "10px",
                      }}
                    >
                      {!msg.serder && (
                        <div className="messages-img">
                          <img
                            src={
                              (avatar
                                ? `${process.env.PUBLIC_URL}/images/${avatar}`
                                : avatarPath) || defaultAvatar
                            }
                            alt="Avatar"
                            style={{
                              width: "40px",
                              height: "40px",
                              borderRadius: "50%",
                            }}
                          />
                        </div>
                      )}

                      <div
                        style={{
                          backgroundColor: "transparent",
                          borderRadius: "35px",
                          wordWrap: "break-word",
                        }}
                      >
                        <strong>{name}</strong>: {msg.content}
                        <span
                          className="timestamp"
                          style={{
                            marginLeft: "10px",
                            fontSize: "12px",
                            color: "#888",
                          }}
                        >
                          {msg.timestamp}
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
            <div id="input-area">
              <input
                type="text"
                id="message-input"
                placeholder="Nhập tin nhắn..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                style={{ width: "70%", padding: "10px", marginRight: "10px" }}
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
        <FooterEmployee />
      </HeaderEmployee>
    </>
  );
};

export default CustomerCare;
