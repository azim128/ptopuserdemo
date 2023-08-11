import React, { useContext, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Container } from "@/components/ReactBootstrap";
import AuthContext from '@/context/AuthContext';
import styles from './multiform.module.css'
const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
const OrderForm = () => {
  const { user } = useContext(AuthContext);
  const [orderData, setOrderData] = useState({
    order_email: '',
    Amount: '',
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
      if (!orderData.order_email || !orderData.Amount || !orderData.purpose) {
        toast.error('Please fill in all required fields');
        return;
      }

      const response = await axios.post(
        `https://${serverUrl}/api/order/create-order/buy/`,
        {
          order_email: orderData.order_email,
          Amount: orderData.Amount,
          purpose: orderData.purpose,
          coin: '1',
          method: 'buy',
        }
      );

      toast.success('Order created successfully');
      // You can also reset the form here if needed
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
        <label htmlFor="Amount">Amount:</label>
        <input
          type="number"
          name="Amount"
          min={20}
          value={orderData.Amount}
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
        <button type="submit" className={styles.submitbtn } disabled={!user}>
          Create Order
        </button>
      </form>
    </div>
    </Container>
  );
};

export default OrderForm;
