
'use client'
import AuthContext from "@/context/AuthContext";
import { useContext,useState,useEffect,useRef } from "react";
import Link from "next/link";
import { Container, Nav, Navbar, Button } from "@/components/ReactBootstrap";
import { BsFillSendFill } from "react-icons/bs";
import styles from "./chat.module.css";
const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
const Chatbody = () => {
  const {authTokens,user} = useContext(AuthContext)
  const [messages, setMessages] = useState([]);
  console.log(messages)
  const [messageInputValue, setMessageInputValue] = useState("");
  const socketRef = useRef(null);
  const ref = useRef();
  console.log(authTokens)
  console.log(user?.name)
  
    useEffect(()=>{
      if (ref.current) {
        ref.current.scrollIntoView({ behavior: "instant", block: "end", inline: "nearest" });
      }
      if (user && authTokens) {
        fetch(`https://${serverUrl}/api/user/messages/${user?.name}_Payoneer/?Accept=application/json&access_token=${authTokens?.token.access}`)
          .then((response) => response.json())
          .then((data) => setMessages(data))
          .catch((error) => console.error("Error fetching messages:", error));
      }
    },[user])  

  useEffect(() => {
    
    
    if (authTokens && user) {
      const socketUrl = `wss://${serverUrl}/ws/chat/${user?.name}_Payoneer/?${authTokens?.token.access}`;
      const socket  = new WebSocket(socketUrl);

      socket.onopen = () => {
        console.log("WebSocket connection established.");
        socketRef.current = socket; // Save the socket reference to the ref
      };
      socket.onmessage = (event) => {
        const messageJson = event.data;
        const message = JSON.parse(messageJson);
        console.log(message);
        setMessages((prevMessages) => [...prevMessages, message]);
      };

      socket.onclose = () => {
        console.log("WebSocket connection closed.");
      };

    
      socket.onerror = (error) => {
        console.error("WebSocket error:", error);
      };
    }

    // Clean up the WebSocket connection on component unmount
    return () => {
      if (socketRef.current) {
        socketRef.current?.close();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages,user,authTokens]);

  function handleInputChange(event) {
    setMessageInputValue(event.target.value);
  }

  function sendMessage(event) {
    event.preventDefault();
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({ message: messageInputValue }));
      setMessageInputValue("");
    }
  }

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
            <ul id={styles.chat}>
              {Array.isArray(messages) &&messages?.map((message, index) => (
                <li
                  key={index}
                  className={
                    message.user.name === user?.name
                      ? `${styles.me}`
                      : `${styles.you}`
                  }
                  ref={ref}
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
        <form className="w-100" onSubmit={sendMessage}>
          <input
            type="text"
            value={messageInputValue}
            placeholder="Send message...."
            onChange={handleInputChange}
          />
          <button type="submit">
            <BsFillSendFill size={24} color="blue" />
          </button>
        </form>
      </div>
        </div>
      );
}

export default Chatbody