
'use client'
import AuthContext from "@/context/AuthContext";
import { useContext,useState,useEffect,useRef } from "react";
import Link from "next/link";
import { Container, Nav, Navbar, Button } from "@/components/ReactBootstrap";
import { BsFillSendFill } from "react-icons/bs";
import styles from "./chat.module.css";
const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
const Chatbody = () => {
  const {user, tokens} = useContext(AuthContext)
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  // Create a ref for the messages container to scroll to
  const messagesContainerRef = useRef();

  

    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollIntoView({
        behavior: "instant",
        block: "end",
        inline: "nearest",
      });}
   

  
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
  }, [tokens]);

  const establishWebSocketConnection = async () => {
    try {
      // URL encode the tokens
      const encodedTokens = encodeURIComponent(tokens);
  
      const socket = new WebSocket(
        `wss://p2p-server-l9qu.onrender.com/ws/chat/${user.name}/Payoneer/?${encodedTokens}`
      );
  
      // Create a promise that resolves when the WebSocket connection is open
      const socketOpenPromise = new Promise((resolve, reject) => {
        socket.addEventListener("open", () => {
          console.log("WebSocket connection established.");
          resolve(socket);
        });
  
        socket.addEventListener("error", (error) => {
          console.error("WebSocket error:", error);
          reject(error);
        });
  
        socket.addEventListener("close", () => {
          console.log("WebSocket connection closed.");
        });
      });
  
      // Wait for the WebSocket connection to be established
      const resolvedSocket = await socketOpenPromise;
  
      // Set the socket state once the connection is established
      setSocket(resolvedSocket);
    } catch (error) {
      console.error("Error creating WebSocket:", error);
    }
  };
  

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
        <div className="d-flex flex-column align-items-between">
          <Navbar bg="primary" variant="dark" className={styles.chatHeader}>
            <Container>
              <Nav className="ms-auto">
                <Nav.Link
                  as={Link}
                  href="/"
                  className={styles.navLink}
                >
                  🏠 Home
                </Nav.Link>
                <Nav.Link href="/" active className={styles.navLink}>
                  👤 Chat with Admin
                </Nav.Link>
              </Nav>
            </Container>
          </Navbar>
          <div className={styles.chatBody}>
            <ul id={styles.chat} ref={messagesContainerRef}>
              {Array.isArray(messages) &&messages?.map((message, index) => (
                <li
                  key={index}
                  className={
                    message.user.name === user?.name
                      ? `${styles.me}`
                      : `${styles.you}`
                  }
                  
                >
                  <div className={styles.entete}>
                    <h2 className="mx-1">
                      {message?.time && message?.time.slice(0, 10)}
                    </h2>
                    <h3 className="mx-1">
                      {message?.time && message?.time.slice(11, 16)}
                    </h3>
                    <h2 className="mx-1">{message?.user.name}</h2>
                    <span
                      className={
                        message.user.name === user?.name
                          ? `${styles.status} ${styles.blue}`
                          : `${styles.status} ${styles.green}`
                      }
                    ></span>
                  </div>
                  <div className={styles.triangle}></div>
    
                  <div className={styles.message}>
                    <p>{message.message}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.inputSection}>
        
        <form className="w-100"
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
        <button type="submit"><BsFillSendFill size={24} color="blue" /></button>
      </form>
      </div>
        </div>
      );
}

export default Chatbody