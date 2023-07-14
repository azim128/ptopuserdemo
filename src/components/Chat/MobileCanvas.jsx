"use client";
import {useState } from "react";

import { Button,Offcanvas } from "@/components/ReactBootstrap";
import styles from "./chat.module.css";

function MobileCanvas() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="light" onClick={handleShow} className="mx-3 my-1">
      Order Details
      </Button>

      <Offcanvas
        show={show}
        onHide={handleClose}
        width="150px"
        className={styles.sideBarContainer}
      >
        <div className={`${styles.upperSide} mt-2`}>
          <Offcanvas.Header
            closeButton
            className={`${styles.upperSidebutton}`}
          ></Offcanvas.Header>
          <h3 className="text-center text-light">Order Details</h3>
        </div>
        <hr />

       
        <div className={styles.bottom}>
         Order box
        </div>
      </Offcanvas>
    </>
  );
}

export default MobileCanvas;
