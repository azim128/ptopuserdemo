"use client";
import { Container } from "@/components/ReactBootstrap";

import styles from "./chat.module.css";


const Sidebar = () => {


  return (
    <Container
      fluid
      className={`d-none d-md-flex flex-column flex-shrink-0 p-0 text-bg-dark w-100 ${styles.sideBarContainer}`}
    >
      <div className={styles.upperSide}>
        <h3 className="text-center text-light m-0">Order Details</h3>
      </div>
     

      <div className={` mt-4 ${styles.bottom}`}>
      {/* <h4 className="ps-5 text-light">Your Order List</h4> */}
      <ul className="list-unstyled">
        <li className={`ps-4 py-2 ${styles.orderitem}`}>
          <h4>frist order</h4>
          <h6>email: xxxx@gmail.comjhjjjjjjjjjjj</h6>
          <h6>80usdt</h6>
        </li>
       
      </ul>
      </div>
    </Container>
  );
};

export default Sidebar;
