"use client";
import {useState } from "react";
import {AiOutlineClose} from 'react-icons/ai'
import { Button,Offcanvas } from "@/components/ReactBootstrap";
import styles from "./chat.module.css";

function MobileCanvas() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
          <h3 className="text-center text-light">Order Details</h3>
        </div>
        <hr />

       
        <div className={` mt-4 ${styles.bottom}`}>
      {/* <h4 className="ps-5 text-light">Your Order List</h4> */}
      <ul className="list-unstyled">
        <li className={`ps-4 py-2 ${styles.orderitem}`}>
          <h4 className="text-light">frist order</h4>
          <h6 className="text-light">email: xxxx@gmail.comjhjjjjjjjjjjj</h6>
          <h6 className="text-light">80usdt</h6>
        </li>
       
      </ul>
      </div>
      </Offcanvas>
    </>
  );
}

export default MobileCanvas;
