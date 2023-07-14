import styles from './multiform.module.css';

const AccountDetailes = ({ formData, setFormData }) => {
  return (
    <div className={styles.signUpContainer}>
      <div className='w-100 text-center'>
        <input
          type="email"
          name="email"
          placeholder="Enter your Account Email..."
          value={formData.order_email}
          autoComplete="email"
          required
          onChange={(event) =>
            setFormData({ ...formData, order_email: event.target.value })
          }
        />
      </div>
    </div>
  );
};

export default AccountDetailes;
