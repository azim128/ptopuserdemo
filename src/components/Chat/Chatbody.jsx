"use client";
import AuthContext from "@/context/AuthContext";
import { useContext, useState, useEffect, useRef } from "react";
import { BsFillSendFill } from "react-icons/bs";
import { IoDocumentAttachOutline } from "react-icons/io5";
import styles from "./chat.module.css";
import ChatNav from "./ChatNav";
import ImageModal from "./ImageModal";
import Allchat from "./Allchat";

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

const Chatbody = () => {
  const { user, tokens } = useContext(AuthContext);
  console.log(user);
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const [showImageModal, setShowImageModal] = useState(false); // State to control the image modal
  const [modalImageSrc, setModalImageSrc] = useState(null);

  const messagesContainerRef = useRef();
  console.log(messages)

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

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const establishWebSocketConnection = () => {
    try {
      const encodedTokens = encodeURIComponent(tokens);
      const wsUrl = `wss://${serverUrl}/ws/chat/${user.name}/Payoneer/?${encodedTokens}`;
      const newSocket = new WebSocket(wsUrl);

      newSocket.addEventListener("open", () => {
        console.log("WebSocket connection established.");
        console.log(wsUrl)
        setSocket(newSocket);
      });

      newSocket.addEventListener("error", (error) => {
        console.error("WebSocket error:", error);
      });

      newSocket.addEventListener("message", (event) => {
        const message = JSON.parse(event.data);
        console.log("Received message:", message);
        setMessages((prevMessages) =>
          Array.isArray(prevMessages) ? [...prevMessages, message] : [message]
        );
      });

      newSocket.addEventListener("close", () => {
        console.log("WebSocket connection closed. Reconnecting...");
        setTimeout(() => establishWebSocketConnection(), 1000);
      });
      newSocket.addEventListener("error", (error) => {
        console.error("WebSocket error:", error);
      });
    } catch (error) {
      console.error("WebSocket error:", error);
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();
    // console.log("sendMessage called");

    console.log("WebSocket ready state:", socket.readyState);
    if (socket && socket.readyState === WebSocket.OPEN) {
      const messageData = { message: inputValue, image: "" };
      console.log("Sending message:", messageData);

      if (selectedImage) {
        messageData.image = selectedImage;
        setSelectedImage(null);
      }

      socket.send(JSON.stringify(messageData));

      setInputValue("");
      setShowImageModal(false);
    } else {
      console.error("WebSocket is not open or not initialized.");
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target.result);
        const base64Image = event.target.result;
        setModalImageSrc(base64Image); // Set the image source for the modal
        setShowImageModal(true);
      };
      reader.readAsDataURL(file);
    }
  };
  const closeModal = () => {
    setShowImageModal(false); // Close the image modal
    setModalImageSrc(null); // Clear the image source when the modal is closed
  };

  const scrollToBottom = () => {
    messagesContainerRef.current?.scrollIntoView({ behavior: "instant" });
  };

  return (
    <div className="d-flex flex-column align-items-between position-relative">
      <ChatNav />
      <div className={styles.chatBody}>
        <ul id={styles.chat}>
          <Allchat messages={messages} user={user} />

          <div ref={messagesContainerRef} />
        </ul>
      </div>

      <ImageModal
        show={showImageModal}
        onHide={closeModal}
        imageSrc={modalImageSrc}
      />

      <div className={styles.inputSection}>
        <form className={`w-100 ${styles.inputdiv}`} onSubmit={sendMessage}>
          <button type="submit">
            <BsFillSendFill size={24} color="#65717c" />
          </button>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type a message..."
          />
          <div className={styles.imageAttachment}>
            <IoDocumentAttachOutline
              color="#65717c"
              size={24}
              onClick={() => {
                document.getElementById("imageInput").click();
              }}
            />
            <input
              id="imageInput"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: "none" }}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Chatbody;
