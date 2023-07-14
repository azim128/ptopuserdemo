// // /* eslint-disable react-hooks/exhaustive-deps */
// // "use client";
// // import { useContext, useEffect, useRef, useState } from "react";
// // import Link from "next/link";
// // import { Container, Nav, Navbar, Button } from "@/components/ReactBootstrap";
// // import { BsFillSendFill } from "react-icons/bs";
// // import styles from "./chat.module.css";
// // import AuthContext from "@/context/AuthContext";
// // import ChatContext from "@/context/ChatContext";



// // const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
// // console.log(serverUrl);
// // const Chatbody = () => {
// //   const {user,authTokens} =useContext(AuthContext)
// //   const {data} =useContext(ChatContext)
// //   console.log(data)
// //   const [socket, setSocket] = useState(null);
// //   const [messages, setMessages] = useState([]);
// //   const [inputValue, setInputValue] = useState('');

// //   const ref = useRef();
// //   useEffect(() => {
// //     if (ref.current) {
// //       ref.current.scrollIntoView({ behavior: "instant", block: "start", inline: "nearest" });
// //     }
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, []);

// //   useEffect(() => {
// //     if(user&&authTokens){
// //       const socket = new WebSocket(`wss://${serverUrl}/ws/chat/${user?.name}/Payoneer/?${authTokens?.token.access}`);

// //     socket.addEventListener('open', () => {
// //       console.log('WebSocket connection established.');
// //     });

// //     socket.addEventListener('message', (event) => {
// //       const message = event.data;
// //       console.log('Received message:', message);
// //       setMessages((prevMessages) => [...prevMessages, message]);
// //     });

// //     socket.addEventListener('close', () => {
// //       console.log('WebSocket connection closed.');
// //     });

// //     setSocket(socket);
// //     }

// //     return () => {
// //       socket?.close();
// //     };
// //   }, []);

// //   const sendMessage = () => {
// //     if (!socket) return;

// //     socket.send(JSON.stringify({ message: inputValue }));
// //     setInputValue('');
// //   };
  

  


 

  
// //   return (
// //     <div className="d-flex flex-column align-items-between">
// //       <Navbar bg="primary" variant="dark" className={styles.chatHeader}>
// //         <Container>
// //           <Nav className="ms-auto">
// //             <Nav.Link
// //               as={Link}
// //               href="/"
// //               className={styles.navLink}
// //               target="_blank"
// //             >
// //               🏠 Home
// //             </Nav.Link>
// //             <Nav.Link href="/" active className={styles.navLink}>
// //               👤 Chat with Admin
// //             </Nav.Link>
// //           </Nav>
// //         </Container>
// //       </Navbar>
// //       <div className={styles.chatBody}>
// //         <ul id={styles.chat}>
// //         {messages?.map((message, index) => (
// //             <li
// //               key={index}
// //               className={message.user.name === user?.name ? styles.me : styles.you}
// //               ref={ref}
// //             >
// //               <div className={styles.entete}>
// //                 <h2 className="mx-1">{message.time.slice(0, 10)}</h2>
// //                 <h3 className="mx-1">{message.time.slice(11, 16)}</h3>
// //                 <h2 className="mx-1">{message?.user.name}</h2>
// //                 <span
// //                   className={
// //                     message.user.name === user?.name ? `${styles.status} ${styles.blue}` : `${styles.status} ${styles.green}`
// //                   }
// //                 ></span>
// //               </div>
// //               <div className={styles.triangle}></div>
// //               <div className={styles.message}>{message.message}</div>
// //             </li>
// //           ))}
// //         </ul>
// //       </div>
// //       <div className={styles.inputSection}>
// //       <form onSubmit={(e) => { e.preventDefault(); sendMessage(); }}>
// //         <input
// //           type="text"
// //           value={inputValue}
// //           onChange={(e) => setInputValue(e.target.value)}
// //           placeholder="Type a message..."
// //         />
// //         <button type="submit">Send</button>
// //       </form>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Chatbody;

// /* eslint-disable react-hooks/exhaustive-deps */
// "use client";
// import { useContext, useEffect, useRef, useState } from "react";
// import Link from "next/link";
// import { Container, Nav, Navbar } from "@/components/ReactBootstrap";
// import { BsFillSendFill } from "react-icons/bs";
// import styles from "./chat.module.css";
// import AuthContext from "@/context/AuthContext";
// const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
// console.log(serverUrl);

// const Chatbody = async() => {
//   const { authTokens, user ,chatdata} = useContext(AuthContext);
//   const [messages, setMessages] = useState([]);
//   const [messageInputValue, setMessageInputValue] = useState("");
//   const [isLoading, setIsLoading] = useState(true);

//   console.log(data)
//   // useEffect(() => {
//   //   if (user && authTokens) {
//   //     getData();
//   //   }
//   // }, [user, authTokens]);

//   // const getData = async () => {
//   //   try {
//   //     const response = await fetch(
//   //       `http://${serverUrl}/api/user/messages/${user?.name}_Payoneer/`,
//   //       {
//   //         headers: {
//   //           Authorization: `Bearer ${authTokens?.token.access}`,
//   //           "Content-Type": "application/json",
//   //         },
//   //       }
//   //     );

//   //     if (!response.ok) {
//   //       throw new Error("Request failed with status code " + response.status);
//   //     }

//   //     const responseData = await response.json();
//   //     console.log(responseData);
//   //     setMessages(responseData);
//   //   } catch (error) {
//   //     console.error("Error:", error.message);
//   //   }
//   // };

//   //   useEffect(() => {
    
//   //     const socket = new WebSocket(
//   //       `wss://${serverUrl}/ws/chat/${user?.name}/Payoneer/?${authTokens?.token.access}`
//   //     );

//   //     socket.onopen = () => {
//   //       console.log("WebSocket connection established.");
//   //       socketRef.current = socket; // Save the socket reference to the ref
//   //     };

//   //     socket.onmessage = (event) => {
//   //       const messageJson = event.data;
//   //       const message = JSON.parse(messageJson);
//   //       console.log(message);
//   //       setMessages((prevMessages) => [...prevMessages, message]);
//   //     };

//   //     socket.onclose = () => {
//   //       console.log("WebSocket connection closed.");
//   //     };

//   //     socket.onerror = (error) => {
//   //       console.error("WebSocket error:", error);
//   //     };
    

//   //   // Clean up the WebSocket connection on component unmount
//   //   return () => {
//   //     if (socketRef.current) {
//   //       socketRef.current?.close();
//   //     }
//   //   };
//   // }, []);

//   // function handleInputChange(event) {
//   //   setMessageInputValue(event.target.value);
//   // }

//   // function sendMessage(event) {
//   //   event.preventDefault();
//   //   if (
//   //     socketRef.current &&
//   //     socketRef.current.readyState === WebSocket.OPEN
//   //   ) {
//   //     socketRef.current.send(JSON.stringify({ message: messageInputValue }));
//   //     setMessageInputValue("");
//   //   }
//   // }

//   // if (isLoading) {
//   //   return <p>Loading...</p>;
//   // }

//   return (
//     <div className="d-flex flex-column align-items-between">
//       {/* <Navbar bg="primary" variant="dark" className={styles.chatHeader}>
//         <Container>
//           <Nav className="ms-auto">
//             <Nav.Link
//               as={Link}
//               href="/"
//               className={styles.navLink}
//               target="_blank"
//             >
//               🏠 Home
//             </Nav.Link>
//             <Nav.Link href="/" active className={styles.navLink}>
//               👤 Chat with Admin
//             </Nav.Link>
//           </Nav>
//         </Container>
//       </Navbar>
//       <div className={styles.chatBody}>
//         <ul id={styles.chat}>
//           {messages?.map((message, index) => (
//             <li
//               key={index}
//               className={
//                 message.user.name === user?.name
//                   ? `${styles.me}`
//                   : `${styles.you}`
//               }
//               ref={ref}
//             >
//               <div className={styles.entete}>
//                 <h2 className="mx-1">
//                   {message?.time && message?.time.slice(0, 10)}
//                 </h2>
//                 <h3 className="mx-1">
//                   {message?.time && message?.time.slice(11, 16)}
//                 </h3>
//                 <h2 className="mx-1">{message?.user.name}</h2>
//                 <span
//                   className={
//                     message.user.name === user?.name
//                       ? `${styles.status} ${styles.blue}`
//                       : `${styles.status} ${styles.green}`
//                   }
//                 ></span>
//               </div>
//               <div className={styles.triangle}></div>

//               <div className={styles.message}>
//                 <p>{message.message}</p>
//               </div>
//             </li>
//           ))}
//         </ul>
//       </div>
//       <div className={styles.inputSection}>
//         <form className="w-100" onSubmit={sendMessage}>
//           <input
//             type="text"
//             value={messageInputValue}
//             placeholder="Send message...."
//             onChange={handleInputChange}
//           />
//           <button type="submit">
//             <BsFillSendFill size={24} color="blue" />
//           </button>
//         </form>
//       </div> */}
//     </div>
//   );
// };


// // const Chatbody = () => {
// //   const { authTokens, user } = useContext(AuthContext);
// //   console.log(user)
// //   console.log(authTokens)
// //   const [messages, setMessages] = useState([]);
// //   const [messageInputValue, setMessageInputValue] = useState("");
// //   const socketRef = useRef(null);
// //   const ref = useRef();
// //  // Fetch the initial chat messages

// //  const getData = async () => {
// //   try {
// //     const response = await fetch(`http://${serverUrl}/api/chat/messages/${user?.name}_Payoneer/`, {
// //       headers: {
// //         Authorization: `Bearer ${authTokens?.token.access}`,
// //     "Content-Type": "application/json"
// //       },
// //     });

// //     if (!response.ok) {
// //       throw new Error("Request failed with status code " + response.status);
// //     }

// //     const responseData = await response.json();
// //     // Process the response data
// //     console.log(responseData);
// //   } catch (error) {
// //     // Handle the error
// //     console.error("Error:", error.message);
// //   }
// // };

// //   useEffect(() => {
// //     // Scroll to the bottom of the chat when messages change
// //     if (ref.current) {
// //       ref.current.scrollIntoView({
// //         behavior: "instant",
// //         block: "end",
// //         inline: "nearest",
// //       });
// //     }

// //     if (user && authTokens) {
// //         // Example usage
// // getData();
// //       }
// //   }, [messages]);

// //   useEffect(() => {
// //     if (authTokens && user) {
// //       const socket = new WebSocket(
// //         `wss://${serverUrl}/ws/chat/${user?.name}/Payoneer/?${authTokens?.token.access}`
// //       );

// //       socket.onopen = () => {
// //         console.log("WebSocket connection established.");
// //         socketRef.current = socket; // Save the socket reference to the ref
// //       };

// //       socket.onmessage = (event) => {
// //         const messageJson = event.data;
// //         const message = JSON.parse(messageJson);
// //         console.log(message);
// //         setMessages((prevMessages) => [...prevMessages, message]);
// //       };

// //       socket.onclose = () => {
// //         console.log("WebSocket connection closed.");
// //       };

// //       socket.onerror = (error) => {
// //         console.error("WebSocket error:", error);
// //       };
// //     }

// //     // Clean up the WebSocket connection on component unmount
// //     return () => {
// //       if (socketRef.current) {
// //         socketRef.current?.close();
// //       }
// //     };
// //   }, []);

// //   function handleInputChange(event) {
// //     setMessageInputValue(event.target.value);
// //   }

// //   function sendMessage(event) {
// //     event.preventDefault();
// //     if (
// //       socketRef.current &&
// //       socketRef.current.readyState === WebSocket.OPEN
// //     ) {
// //       socketRef.current.send(JSON.stringify({ message: messageInputValue }));
// //       setMessageInputValue("");
// //     }
// //   }

// //   return (
// //     <div className="d-flex flex-column align-items-between">
// //       <Navbar bg="primary" variant="dark" className={styles.chatHeader}>
// //         <Container>
// //           <Nav className="ms-auto">
// //             <Nav.Link
// //               as={Link}
// //               href="/"
// //               className={styles.navLink}
// //               target="_blank"
// //             >
// //               🏠 Home
// //             </Nav.Link>
// //             <Nav.Link href="/" active className={styles.navLink}>
// //               👤 Chat with Admin
// //             </Nav.Link>
// //           </Nav>
// //         </Container>
// //       </Navbar>
// //       <div className={styles.chatBody}>
// //         <ul id={styles.chat}>
// //           {messages?.map((message, index) => (
// //             <li
// //               key={index}
// //               className={
// //                 message.user.name === user?.name
// //                   ? `${styles.me}`
// //                   : `${styles.you}`
// //               }
// //               ref={ref}
// //             >
// //               <div className={styles.entete}>
// //                 <h2 className="mx-1">
// //                   {message?.time && message?.time.slice(0, 10)}
// //                 </h2>
// //                 <h3 className="mx-1">
// //                   {message?.time && message?.time.slice(11, 16)}
// //                 </h3>
// //                 <h2 className="mx-1">{message?.user.name}</h2>
// //                 <span
// //                   className={
// //                     message.user.name === user?.name
// //                       ? `${styles.status} ${styles.blue}`
// //                       : `${styles.status} ${styles.green}`
// //                   }
// //                 ></span>
// //               </div>
// //               <div className={styles.triangle}></div>

// //               <div className={styles.message}>
// //                 <p>{message.message}</p>
// //               </div>
// //             </li>
// //           ))}
// //         </ul>
// //       </div>
// //       <div className={styles.inputSection}>
// //         <form className="w-100" onSubmit={sendMessage}>
// //           <input
// //             type="text"
// //             value={messageInputValue}
// //             placeholder="Send message...."
// //             onChange={handleInputChange}
// //           />
// //           <button type="submit">
// //             <BsFillSendFill size={24} color="blue" />
// //           </button>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };

// export default Chatbody;
'use client'
import AuthContext from "@/context/AuthContext";
import { useContext,useState,useEffect,useRef } from "react";
import Link from "next/link";
import { Container, Nav, Navbar, Button } from "@/components/ReactBootstrap";
import { BsFillSendFill } from "react-icons/bs";
import styles from "./chat.module.css";
const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
const Chatbody = () => {
  const {chatdata,authTokens,user, ordermassage} = useContext(AuthContext)
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState(chatdata);
  const [inputValue, setInputValue] = useState('');
  const socketRef = useRef(null);
  console.log(messages)
  const ref = useRef();
  console.log(authTokens)
  console.log(user)
  
      

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "instant", block: "end", inline: "nearest" });
    }
    
    if (authTokens && user) {
      const socket  = new WebSocket(
      `wss://${serverUrl}/ws/chat/${user?.name}/Payoneer/?${authTokens?.token.access}`
    );

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
    };}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  const sendMessage = () => {
    if (!socket) return;

    socket.send(JSON.stringify({ message: inputValue }));
    setInputValue('');
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
                  target="_blank"
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
              {messages?.map((message, index) => (
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
          <form onSubmit={(e) => { e.preventDefault(); sendMessage(); }}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
            {/* <form className="w-100" onSubmit={sendMessage}>
              <input
                type="text"
                value={messageInputValue}
                placeholder="Send message...."
                onChange={handleInputChange}
              />
              <button type="submit">
                <BsFillSendFill size={24} color="blue" />
              </button>
            </form> */}
          </div>
        </div>
      );
}

export default Chatbody