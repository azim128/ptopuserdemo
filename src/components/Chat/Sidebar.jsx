"use client";
import { Container } from "@/components/ReactBootstrap";

import styles from "./chat.module.css";


const Sidebar = () => {


  return (
    <Container
      fluid
      className={`d-none d-md-flex flex-column flex-shrink-0 p-3 text-bg-dark w-100 ${styles.sideBarContainer}`}
    >
      <div className={styles.upperSide}>
        <h3 className="text-center text-light">Order Details</h3>
      </div>
      <hr />

      <div className={`ps-4 ${styles.bottom}`}>
      <h3 className=" text-light">Order Box</h3>
      </div>
    </Container>
  );
};

export default Sidebar;
