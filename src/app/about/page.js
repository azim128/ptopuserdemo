"use client";
import BasicNavbar from "@/components/Navbar";
import AuthContext from "@/context/AuthContext";
import React, { useContext, useEffect, useState } from "react";

function WebSocketClient() {
  const { user, tokens } = useContext(AuthContext);

  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");



  useEffect(() => {
    if (user && tokens) {
      const fetchMessages = async () => {
        try {
          const response = await fetch(
            `https://p2p-server-l9qu.onrender.com/api/user/messages/${user?.name}_Payoneer/?Accept=application/json&access_token=${tokens}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch messages");
          }
          const data = await response.json();
          setMessages(data);

          // Now that you have the data, you can proceed with the WebSocket connection
          establishWebSocketConnection();
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      };

      fetchMessages();
    }
    return () => {
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.close();
      }
    };
  }, [tokens, user]);

  const establishWebSocketConnection = () => {
    try {
      const socket = new WebSocket(
        `wss://p2p-server-l9qu.onrender.com/ws/chat/${user.name}/Payoneer/?${tokens}`
      );

      socket.addEventListener("open", () => {
        console.log("WebSocket connection established.");
      });

      socket.addEventListener('message', (event) => {
        const message = JSON.parse(event.data);
        console.log('Received message:', message);
        setMessages((prevMessages) => [...prevMessages, message]); // Change this line to include the entire message object
      });

      socket.addEventListener("error", (error) => {
        console.error("WebSocket error:", error);
      });

      socket.addEventListener("close", () => {
        console.log("WebSocket connection closed.");
      });

      setSocket(socket);
    } catch (error) {
      console.error("Error creating WebSocket:", error);
    }
  };

  // const sendMessage = (e) => {
  //   e.preventDefault();
  //   if (!socket) return;

  //   socket.send(JSON.stringify({ message: inputValue }));
  //   setInputValue("");
  // };

  const sendMessage = (e) => {
    e.preventDefault();
    if (socket && socket.readyState === WebSocket.OPEN) {
      // Check if the socket exists and is open before sending the message
      socket.send(JSON.stringify({ message: inputValue }));
      setInputValue("");
    } else {
      console.error("WebSocket is not open or not initialized.");
    }
  };

  return (
    <div>
      <BasicNavbar />
      <h1>My WebSocket Client</h1>
      <div id="messages">
        {Array.isArray(messages) &&
          messages.map((message, index) => (
            <p key={index}>{message.message}</p>
          ))}
      </div>

      <form
        onSubmit={(e) => {
          sendMessage(e);
        }}
      >
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default WebSocketClient;
