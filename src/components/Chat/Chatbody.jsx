
'use client'



import AuthContext from "@/context/AuthContext";



import { useContext,useState,useEffect,useRef } from "react";
import Link from "next/link";
import { Container, Nav, Navbar, Button } from "@/components/ReactBootstrap";
import { BsFillSendFill } from "react-icons/bs";
import {IoDocumentAttachOutline} from "react-icons/io5"
import styles from "./chat.module.css";
import MobileCanvas from "./MobileCanvas";
const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
const Chatbody = () => {
  const { user, tokens } = useContext(AuthContext);
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [image, setImage] = useState();
  const [inputValue, setInputValue] = useState("");
  const messagesContainerRef = useRef();

  useEffect(() => {
    if (user && tokens) {
      const fetchMessages = async () => {
        try {
          const response = await fetch(
            `https://${serverUrl}/api/user/messages/${user?.name}_Payoneer/?Accept=application/json&access_token=${tokens}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch messages");
          }
          const data = await response.json();
          
          setMessages(data);

          // Now that you have the data, you can proceed with the WebSocket connection
          if (!socket || socket.readyState !== WebSocket.OPEN) {
            establishWebSocketConnection();
          }
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
  }, [user, tokens]);

  const establishWebSocketConnection = () => {
    try {
      // URL encode the tokens
      const encodedTokens = encodeURIComponent(tokens);

      const socket = new WebSocket(
        `wss://${serverUrl}/ws/chat/${user.name}/Payoneer/?${encodedTokens}`
      );

      socket.addEventListener("open", () => {
        console.log("WebSocket connection established.");
        setSocket(socket);
      });

      socket.addEventListener("error", (error) => {
        console.error("WebSocket error:", error);
      });

      socket.addEventListener("message", (event) => {
        // Handle incoming messages from the server
        const message = JSON.parse(event.data);
        setMessages((prevMessages) => Array.isArray(prevMessages) ? [...prevMessages,message] : [message]);
      });

      socket.addEventListener("close", () => {
        console.log("WebSocket connection closed. Reconnecting...");
        // Re-establish the WebSocket connection when it's closed unexpectedly
        // setTimeout(establishWebSocketConnection, 1000);
      });
    } catch (error) {
      console.error("Error creating WebSocket:", error);
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (socket && socket.readyState === WebSocket.OPEN) {
      // Check if the socket exists and is open before sending the message
      socket.send(JSON.stringify({ message: inputValue,image:image }));
      setInputValue("");
      
    } else {
      console.error("WebSocket is not open or not initialized.");
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64Image = event.target.result;
        const imageMessage = {
          type: "image",
          content: base64Image,
        };
        setImage(imageMessage)
      };
      reader.readAsDataURL(file);
    }
  };

  const scrollToBottom = () => {
    messagesContainerRef.current?.scrollIntoView({ behavior: "instant" })
  }

  useEffect(() => {
    // Scroll to the bottom of the messages container whenever messages change
    scrollToBottom()
  }, [messages]);


  return (
        <div className="d-flex flex-column align-items-between">
          <Navbar  variant="dark" className={styles.chatHeader}>
            <Container fluid>
            <div className=' d-block d-md-none absoluteCanvas'>
        <MobileCanvas/>
        </div>
              <Nav className="ms-auto">
                <Nav.Link
                  as={Link}
                  href="/"
                  className={styles.navLink}
                >
                  🏠<span className="d-none d-md-inline-block">Home</span> 
                </Nav.Link>
                <Nav.Link href="/" >
                💬 <span className="d-none d-md-inline-block">Admin</span> 
                </Nav.Link>
              </Nav>
            </Container>
          </Navbar>
          <div className={styles.chatBody}>
            <ul id={styles.chat} >


           
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
      
        <p className="mb-0">{message.message}</p>
      
    </div>
                </li>
              ))}

<div ref={messagesContainerRef} />
             
            </ul>
          </div>
          <div className={styles.inputSection}>
          
        <form className={`w-100 ${styles.inputdiv}`}
        onSubmit={(e) => {
          sendMessage(e);
        }}
      >
        <button type="submit"><BsFillSendFill size={24} color="#65717c" /></button>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type a message..."
        />
        <div className={styles.imageAttachment}>
            {/* Display the attachment icon */}
            <IoDocumentAttachOutline color="#65717c" size={24} 
              onClick={() => {
                document.getElementById("imageInput").click();
              }}
            />
            <input
              id="imageInput" // Add an ID to the input element
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e)}
              style={{ display: "none" }} // Hide the input element
            />
          </div>
        
        
      </form>
      </div>
        </div>
      );
}

export default Chatbody