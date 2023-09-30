"use client";
import {useContext, useState } from "react";
import {AiOutlineClose} from 'react-icons/ai'
import { Button,Offcanvas } from "@/components/ReactBootstrap";
import styles from "./chat.module.css";
import ChatContext from "@/context/ChatContext";

function MobileCanvas() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const {orderdata} = useContext(ChatContext)
  const falseStateData = orderdata ? orderdata.data.reverse():[];
  // console.log('see..............',falseStateData)
  return (
    <>
      <Button  onClick={handleShow} className={`mx-3 my-1 ${styles.showbtn}`}>
      Order Details
      </Button>

      <Offcanvas
        show={show}
        onHide={handleClose}
        width="150px"
        className={styles.sideBarContainer}
      >
        <div className={`${styles.upperSideMobile} mt-2`}>
        <AiOutlineClose size={28} color="#fff" className={styles.hidebtn} onClick={handleClose}/>
          <h5 className="text-center text-light">All Pending Order Details</h5>
        </div>
        <hr />

       
        <div className={` mt-4 ${styles.bottom}`}>
      
      <ul className="list-unstyled">
      {falseStateData && falseStateData.map(item => (
        <li className={`ps-4 py-4 ${styles.orderitem} text-light`} key={crypto.randomUUID()}>
        
        Amount: {item?.amount} USDT<br />
        {item?.account_details!==null && <> Account details:{item.account_details} <br /></> }
        {item?.bep20_address!==null && <> bep20 address:{item.bep20_address} <br /></> }
        {item?.trc20_address!==null && <> bep20 address:{item.trc20_address} <br /></> }
        {item?.order_email!==null && <> Order email:{item.order_email} <br /></> }
        {item?.purpose!==null && <> Order email:{item.purpose} <br /></> }
        Method: {item?.method}<br />
        Time: {item?.time?.slice(0,16)?.replace('T','  ')}<br />
    </li>))}
   
       
      </ul>
      </div>
      </Offcanvas>
    </>
  );
}

export default MobileCanvas;
