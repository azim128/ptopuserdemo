import {  toast } from 'react-toastify';
import styles from "./multiform.module.css";

const Purchase = ({ formData, setFormData }) => {
  const handleAmountChange = (event) => {
    const value = event.target.value;
    if (!isNaN(value) && value >= 0) {
      setFormData({ ...formData, amount: value });
    } else {
      toast.error('Please enter amount');
    }
  };
  return (
    <div className={styles.signUpContainer}>
      <div className='w-100 text-center'>
      <input
        type="text"
        placeholder="Enter Amount You Want to Buy"
        value={formData.amount}
        autoComplete="on"
        onChange={handleAmountChange}
        required
      />
      </div>

      
    </div>
  );
};

export default Purchase;
