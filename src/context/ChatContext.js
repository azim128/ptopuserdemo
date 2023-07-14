/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { createContext, useContext, useEffect, useState } from "react";
import AuthContext from "./AuthContext";
const ChatContext = createContext();
const serverURL= process.env.NEXT_PUBLIC_SERVER_URL;
export default ChatContext;

export const ChatProvider = ({ children }) => {
  const {user, authTokens } = useContext(AuthContext);

  const headers = {
    Authorization: `Bearer ${authTokens?.token.access}`,
    "Content-Type": "application/json",
  };
   const [data, setData] = useState([]);

   
    
  
  


  //  Modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  let contextData = {
    data,
    headers,
    show,handleClose,handleShow,
    

  };

  return (
    <ChatContext.Provider value={contextData}>{children}</ChatContext.Provider>
  );
};
