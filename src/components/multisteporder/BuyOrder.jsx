import React, { useContext, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Container } from "@/components/ReactBootstrap";
import AuthContext from '@/context/AuthContext';
import styles from './multiform.module.css';
import { useRouter } from 'next/navigation'
import ChatContext from '@/context/ChatContext';
const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

const OrderForm = () => {
  const router = useRouter()
  const { user, tokens } = useContext(AuthContext);
  
  const {currencyA} = useContext(ChatContext)
  const [orderData, setOrderData] = useState({
    order_email: user.email||'',
    amount: currencyA,
    purpose: 'pay',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!orderData.order_email || !orderData.amount || !orderData.purpose) {
        toast.error('Please fill in all required fields');
        return;
      }

      // Client-side validation for amount
      if (parseInt(orderData.amount) < 20) {
        toast.error('Amount must be at least 20');
        return;
      }
      if(tokens){
        await axios.post(
          `https://${serverUrl}/api/order/create-order/buy/?Accept=application/json&access_token=${tokens}`,
          {
            order_email: orderData.order_email,
            amount: orderData.amount,
            purpose: orderData.purpose,
            coin: 1, // Make sure to use the correct data type here
            method: 'buy',
          }
        );
  
        toast.success('Order created successfully');
        router.push('/chat')
      }
      
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        const errorKeys = Object.keys(error.response.data.errors);
        const errorMessage = error.response.data.errors[errorKeys[0]][0];
        toast.error(errorMessage);
      } else {
        toast.error('An error occurred while creating the order');
      }
    }
  };

  return (
    <Container style={{ minHeight: "75vh" }}>
      <div className={styles.wrapper}>
        <form onSubmit={handleSubmit}>
          <label htmlFor="order_email">Order Email:</label>
          <input
            type="email"
            name="order_email"
            value={orderData.order_email}
            onChange={handleChange}
            placeholder="Email"
          />
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            name="amount"
            min={50}
            value={orderData.amount}
            onChange={handleChange}
            placeholder="Buy Amount"
          />
          <label htmlFor="purpose">Purpose:</label>
          <input
            type="text"
            name="purpose"
            value={orderData.purpose}
            onChange={handleChange}
            placeholder="Purpose"
          />
          <button type="submit" className={styles.submitbtn} disabled={!user}>
            Create Order
          </button>
        </form>
      </div>
    </Container>
  );
};

export default OrderForm;
