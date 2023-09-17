import React, { useContext, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Container } from 'react-bootstrap';
import styles from './multiform.module.css';
import AuthContext from '@/context/AuthContext';

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

const OrderForm = () => {
  const { user, tokens } = useContext(AuthContext);
  const [orderData, setOrderData] = useState({
    amount: 20,
    walletType: '',
    address: '',
    feeOption: 'binance', // Default fee option
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
      if (!orderData.amount || !orderData.walletType || !orderData.address) {
        toast.error('Please fill in all required fields');
        return;
      }

      // Client-side validation for TRC20 and BEP20 addresses
      // if (orderData.walletType === 'trc20' ) {
      //   toast.error('Invalid TRC20 address');
      //   return;
      // }

      // if (orderData.walletType === 'bep20' ) {
      //   toast.error('Invalid BEP20 address');
      //   return;
      // }
      if(tokens){
      await axios.post(
        `https://${serverUrl}/api/order/create-order/sell/?Accept=application/json&access_token=${tokens}`,
        {
          account_details: orderData.walletType,
          coin: 1,
          amount: orderData.amount,
          purpose: 'pay',
          trc20_address: orderData.walletType === 'trc20' ? orderData.address : '',
          bep20_address: orderData.walletType === 'bep20' ? orderData.address : '',
          method: 'sell',
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

  // You can define your validation functions here for TRC20 and BEP20 addresses

  return (
    <Container style={{ minHeight: '75vh' }}>
      <div className={styles.wrapper}>
        <form onSubmit={handleSubmit}>
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            name="amount"
            min={20}
            value={orderData.amount}
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
            <option value="trc20">TRC20</option>
            <option value="bep20">BEP20</option>
          </select>

          <label htmlFor="address">{orderData.walletType === 'trc20' ? 'TRC20' : 'BEP20'} Address:</label>
          <input
            type="text"
            name="address"
            value={orderData.address}
            onChange={handleChange}
            placeholder={`${orderData.walletType.toUpperCase()} Address`}
            required
          />

          {/* Fee Selection */}
          <label htmlFor="feeOption">Fee Option:</label>
          <select
            name="feeOption"
            value={orderData.feeOption}
            onChange={handleChange}
            required
          >
            <option value="binance">Binance (No Fee)</option>
            <option value="other">Other Wallet (1USDT Fee)</option>
          </select>

          <button type="submit" className={styles.submitbtn} disabled={!user}>
            Create Order
          </button>
        </form>
      </div>
    </Container>
  );
};

export default OrderForm;
