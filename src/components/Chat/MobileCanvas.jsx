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
  const falseStateData = orderdata ? orderdata.data?.filter(item => item.state === false):[];
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
          <h3 className="text-center text-light">Last Order Details</h3>
        </div>
        <hr />

       
        <div className={` mt-4 ${styles.bottom}`}>
      
      <ul className="list-unstyled">
      {falseStateData && falseStateData.map(item => (
        <li className={`ps-4 py-2 ${styles.orderitem} text-light`}>
        Account Details: {item?.account_details}<br />
            Amount: {item?.amount}<br />
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
