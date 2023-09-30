/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import useSWR from 'swr';
import axios from 'axios';

import { createContext, useContext, useEffect, useState } from "react";
import AuthContext from "./AuthContext";
const ChatContext = createContext();
const serverURL = process.env.NEXT_PUBLIC_SERVER_URL;
export default ChatContext;

export const ChatProvider = ({ children }) => {
  const { user, tokens } = useContext(AuthContext);

  



  // Modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fetcher = async (url) => {
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${tokens}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status !== 200) {
        throw new Error('Failed to fetch data');
      }
  
      return response.data;
    } catch (error) {
      throw new Error('Error fetching data: ' + error.message);
    }
  };
  
  const { data: orderdata, error } = useSWR(
    user ? `https://${serverURL}/api/order/get-user-incompleted-order/${user.id}/1/` : null,
    fetcher,{ refreshInterval: 1000 }
  );
  



// currency context
const [currencyA, setCurrencyA] = useState(0);
// console.log(currencyA)
  let contextData = {
    orderdata,
    show,
    handleClose,
    handleShow,
    currencyA,setCurrencyA
  };

  return (
    <ChatContext.Provider value={contextData}>{children}</ChatContext.Provider>
  );
};
