import React, { useContext, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Container } from 'react-bootstrap';
import styles from './multiform.module.css'
import AuthContext from '@/context/AuthContext';
const OrderForm = () => {
  const { user } = useContext(AuthContext);
  const [orderData, setOrderData] = useState({
    Amount: 20,
    walletType: '',
    trc20Address: '',
    trc20FeeOption: 'binance',
    bep20Address: '',
    bep20FeeOption: 'binance',
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
      
      console.log('Order data:', orderData);
      // Reset the form after submission
      setOrderData({
        Amount: 20,
        walletType: '',
        trc20Address: '',
        trc20FeeOption: 'binance',
        bep20Address: '',
        bep20FeeOption: 'binance',
      });

      // Handle success
      toast.success('Order created successfully');
      // You can also reset the form here if needed
    } catch (error) {
      // Handle error
      toast.error('An error occurred while creating the order');
    }
  };

  return (
    <Container style={{ minHeight: "75vh" }}>
  <div className={styles.wrapper}>
    <form onSubmit={handleSubmit}>
    <label htmlFor="Amount">Amount:</label>
        <input
          type="number"
          name="Amount"
          min={20}
          value={orderData.Amount}
          onChange={handleChange}
          placeholder="Buy Amount"
        />
      {/* Wallet Type Selection */}

      <label htmlFor="walletType">Wallet Type:</label>
      <select
        name="walletType"
        value={orderData.walletType}
        onChange={handleChange}
        required
      >
        <option value="">Select Wallet Type</option>
        <option value="trc20">Trc20</option>
        <option value="bep20">Bep20</option>
      </select>

      {orderData.walletType === "trc20" && (
        <div>
          <label htmlFor="trc20Address">Trc20 Address:</label>
          <input
            type="text"
            name="trc20Address"
            value={orderData.trc20Address}
            onChange={handleChange}
            placeholder="Trc20 Address"
            required
          />

          {/* Fee Selection for Trc20 */}
          <label htmlFor="trc20FeeOption">Fee Option:</label>
          <select
            name="trc20FeeOption"
            value={orderData.trc20FeeOption}
            onChange={handleChange}
            required
          >
            <option value="binance">Binance (No Fee)</option>
            <option value="other">Other Wallet (1 USDT Fee)</option>
          </select>
        </div>
      )}

      {orderData.walletType === "bep20" && (
        <div>
          <label htmlFor="bep20Address">Bep20 Address:</label>
          <input
            type="text"
            name="bep20Address"
            value={orderData.bep20Address}
            onChange={handleChange}
            placeholder="Bep20 Address"
            required
          />

          {/* Fee Selection for Bep20 */}
          <label htmlFor="bep20FeeOption">Fee Option:</label>
          <select
            name="bep20FeeOption"
            value={orderData.bep20FeeOption}
            onChange={handleChange}
            required
          >
            <option value="binance">Binance (No Fee)</option>
            <option value="other">Other Wallet (0.29 Fee)</option>
          </select>
        </div>
      )}

      <button type="submit" className={styles.submitbtn} disabled={!user}>
        Create Order
      </button>
    </form>
  </div>
</Container>

  
  
  );
};

export default OrderForm;
