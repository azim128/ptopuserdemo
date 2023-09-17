"use client";
import { Container } from "@/components/ReactBootstrap";

import styles from "./chat.module.css";
import { useContext } from "react";
import ChatContext from "@/context/ChatContext";


const Sidebar = () => {
  const {orderdata} = useContext(ChatContext)
  // console.log(orderdata)
  const falseStateData = orderdata ? orderdata.data?.filter(item => item.state === false):[];
  // console.log('see..............',falseStateData)

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
      <ul className="list-unstyled ps-2">
      {falseStateData && falseStateData.map(item => (
        <li className={`ps-4 py-4 ${styles.orderitem} text-light`} key={crypto.randomUUID()}>
        
            Amount: {item?.amount} USDT<br />
            Method: {item?.method}<br />
            Time: {item?.time?.slice(0,16)?.replace('T','  ')}<br />
        </li>))}
       
      </ul>
      </div>
    </Container>
  );
};

export default Sidebar;
