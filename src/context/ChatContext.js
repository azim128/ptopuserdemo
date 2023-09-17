/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { createContext, useContext, useEffect, useState } from "react";
import AuthContext from "./AuthContext";
const ChatContext = createContext();
const serverURL = process.env.NEXT_PUBLIC_SERVER_URL;
export default ChatContext;

export const ChatProvider = ({ children }) => {
  const { user, tokens } = useContext(AuthContext);

  

  const [orderdata, setorderData] = useState([]);

  // Modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fetchdata = async () => {
    const encodedTokens = encodeURIComponent(tokens);
    try {
      const response = await fetch(
        `https://${serverURL}/api/order/get-user-order/${user?.id}/1/`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${encodedTokens}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch messages");
      }

      const fetchedData = await response.json();
      setorderData(fetchedData);
    

      // Handle the fetched data as needed here
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    if(user&&tokens){
    fetchdata();}
  }, [user, tokens]);
console.log(orderdata)
  let contextData = {
    orderdata,
    show,
    handleClose,
    handleShow,
  };

  return (
    <ChatContext.Provider value={contextData}>{children}</ChatContext.Provider>
  );
};
