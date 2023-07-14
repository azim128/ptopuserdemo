'use client'
import BasicNavbar from "@/components/Navbar"
import React, { useEffect, useState } from 'react';
export const metadata={
  title:'About-PTOP'
}



function WebSocketClient() {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const socket = new WebSocket('wss://p2p-server-l9qu.onrender.com/ws/chat/AzMkdty/Payoneer/?eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg5MTc3ODE5LCJpYXQiOjE2ODc4ODE4MTksImp0aSI6ImNjNjE5NGQzOTk1ZDQwM2I5ZGIzYTU3OTg3M2Q1YTViIiwidXNlcl9pZCI6MX0.5OGBoV2WNy0rLl3F_Zo3MRDOtZWsZUcDE2T8UI8bSy4');

    socket.addEventListener('open', () => {
      console.log('WebSocket connection established.');
    });

    socket.addEventListener('message', (event) => {
      const message = event.data;
      console.log('Received message:', message);
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socket.addEventListener('close', () => {
      console.log('WebSocket connection closed.');
    });

    setSocket(socket);

    return () => {
      socket.close();
    };
  }, []);

  const sendMessage = () => {
    if (!socket) return;

    socket.send(JSON.stringify({ message: inputValue }));
    setInputValue('');
  };

  return (
    <div>
      <BasicNavbar/>
      <h1>My WebSocket Client</h1>
      <div id="messages">
        {messages.map((message, index) => (
          <p key={index}>{message}</p>
        ))}
      </div>

      <form onSubmit={(e) => { e.preventDefault(); sendMessage(); }}>
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



