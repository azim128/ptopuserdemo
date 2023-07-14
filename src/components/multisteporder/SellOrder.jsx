'use client'
import { useContext, useState } from "react";
import { Button } from "@/components/ReactBootstrap";
import {toast} from 'react-toastify'
import { useRouter } from 'next/navigation';


import styles from "./multiform.module.css";
import AuthContext from "@/context/AuthContext";
import Purchase from "./Purchase";
import AccountDetailes from "./AccountDetailes";
import Final from "./Final";
import PrivateRoute from "@/helper/PrivateRoute";
const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;


const SellOrder = () => {
  const { user, authTokens,setOrderMessage } = useContext(AuthContext);
 
  const [page, setPage] = useState(0);
 
  console.log(user);
  const router = useRouter();

  
  const [formData, setFormData] = useState({
    customer: `${user?.name}`,
    account_details:'any',
    coin:'1',
    amount: "0",
    order_email: "",
    method: "sell",
    state: "Processing",
  });

  const FormTitles = ["I want to Sell", "Account Info", "Order"];

  const PageDisplay = () => {
    if (page === 0) {
      return <Purchase formData={formData} setFormData={setFormData} />;
    } else if (page === 1) {
      return <AccountDetailes formData={formData} setFormData={setFormData} />;
    } else {
      return <Final/>
    }
  };
  
  const handleSubmit = async() => {
    if (page === FormTitles.length - 1) {
      const formDataString = Object.keys(formData)
      .map(key => `${key}: ${formData[key]}`)
      .join(' , ');

      try {
        const response = await fetch(`https://${serverUrl}/api/order/create-order/?Accept=application/json&access_token=${authTokens?.token.access}`, {
          method: 'POST',
          body: JSON.stringify(formData),
        });
  
        if (response.ok) {
          toast.success('Order created successfully');
          setOrderMessage(formDataString)
        } else {
          const errorData = await response.json();
          toast.error(`Failed to create order: ${errorData.message}`);
        }
      } catch (error) {
        toast.error('An error occurred while creating the order');
      }

      router.push('/chat')
    } else {
      setPage((currPage) => currPage + 1);
    }
  };
  
  const closeChat=()=>{
    router.push('/');
  }
  //Chat 
  


  return (
    <PrivateRoute>
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "80vh" }}
    >
      <div className={styles.form}>
        <div className={styles.progressbar}>
          <div
            style={{
              width: page === 0 ? "33.3%" : page === 1 ? "66.6%" : "100%", borderRadius:'5px'
            }}
          ></div>
        </div>
        <div className={styles.formContainer}>
          <div className={`${styles.header} position-relative`}>
            <h1>{FormTitles[page]}</h1>
            <button
              type="button"
              className="btn-close position-absolute end-0 me-3"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={closeChat}
            ></button>
          </div>
          <div className={styles.body}>{PageDisplay()}</div>
          <div className={styles.footer}>
            <Button
              disabled={page === 0}
              onClick={() => {
                setPage((currPage) => currPage - 1);
              }}
            >
              Prev
            </Button>
            <Button onClick={handleSubmit}>
              {page === FormTitles.length - 1 ? "Submit" : "Next"}
            </Button>
          </div>
        </div>
      </div>
    </div>
    </PrivateRoute>
  );
};




export default SellOrder