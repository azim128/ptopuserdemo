/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import Cookies from 'js-cookie';
import { Container, Row } from "react-bootstrap";
import BasicNavbar from "../Navbar";
import styles from '@/components/Singlecoin/sellBuyPage.module.css'
import Image from "next/image";
import { useContext, useState } from "react";
import ModalBox from "../Model";
import { FaUser, FaEnvelope, FaMoneyBillAlt, FaCheck } from "react-icons/fa";
import { AiOutlineInfoCircle, AiTwotoneNotification, AiOutlineWarning } from "react-icons/ai";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import AboutUs from "../about/AboutUs";
import ChatContext from '@/context/ChatContext';

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

const BuyPage = ({data}) => {
  const {currencyA,setCurrencyA}= useContext(ChatContext)
  const [currencyB, setCurrencyB] = useState(0);
  

  const handleCurrencyAChange = (event) => {
    const value = event.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setCurrencyA(value);
      setCurrencyB(Number(value) * exchangeRate);
    }
  };

  const handleCurrencyBChange = (event) => {
    const value = event.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setCurrencyB(value);
      setCurrencyA(Number(value) / exchangeRate);
      Cookies.set("inputcurrency", JSON.stringify(value));
    }
  };
  const exchangeRate = data?.buy_rate;
 console.log(data)
  return (
    <>
    <header>
        <BasicNavbar />
      </header>
      <Container>
        <Row>
          <div className="px-4 py-5 my-5 text-center">
            <Image
              className="d-block mx-auto mb-4"
              src={`https://${serverUrl}${data.icon}`}
              alt=""
              width={216}
              height={172}
            />
            <h1 className="display-5 fw-bold heading text-light ">
      
              Exchange Rate : {exchangeRate}
            </h1>
  
            <p className="heading4 my-3 text-light">{data?.name}</p>
            <div className="col-md-10 mx-auto">
              <p className="lead mb-4 text-light">
                {data?.description}
              </p>
              <div className={`${styles.wrapper} row`}>
                <div className="col-6">
                  <label className="text-left mb-1 text-light">I will pay USD</label>
                  <input
                    type="text"
                    value={currencyA}
                    onChange={handleCurrencyAChange}
                  />
                </div>
                <div className="col-6">
                  <label className="text-left mb-1 text-light">and receive USDT</label>
                  <input
                    type="text"
                    value={currencyB}
                    onChange={handleCurrencyBChange}
                  />
                </div>
              </div>
            </div>
            <div className="col mx-auto my-5">
              <div className="d-flex flex-column gap-2 justify-content-center">
                <div className="d-flex flex-column  justify-content-center gap-4  align-items-center">
                  <ModalBox title={'Buy via Web'}/>
                  <h4 className="text-light">OR</h4>
                  <ModalBox title={'Exchance Direct Contact'}/>
                 
                </div>
                
              </div>
            </div>
          </div>
        </Row>
      </Container>
      <div style={{background:'#222'}}>
      <VerticalTimeline>
      {events.map((event, index) => (
        <VerticalTimelineElement key={index} date={event.date} iconStyle={{ background: "#1f5297", color: "#fff" }} icon={event.icon}>
          <h3 className="vertical-timeline-element-title">{event.title}</h3>
          <p>{event.content}</p>
        </VerticalTimelineElement>
      ))}
    </VerticalTimeline>
      </div>
      <AboutUs/>
    </>
  )
}



export default BuyPage;

const events = [
  {
    date: "Step 1",
    title: "First transaction",
    content:
      "If this is the first transaction between us, please send me a snapshot of the balance in your Payoneer account.",
    icon: <FaUser />,
  },
  {
    date: "Step 2",
    title: "Wait for email",
    content: "Wait for me to send an email to receive the money.",
    icon: <FaEnvelope />,
  },
  {
    date: "Step 3",
    title: "Deposit and screenshot",
    content: "Deposit and send me a screenshot after payment.",
    icon: <FaMoneyBillAlt />,
  },
  {
    date: "Step 4",
    title: "Confirmation",
    content:
      "Please wait 5-7 minutes for Payoneer to confirm. I will disburse as soon as the transaction is complete!",
    icon: <FaCheck />,
  },
  {
    date: "Note",
    title: "Important Note",
    content:
      "DO NOT deposit with a description related to BTC, USDT, ETH, PAXFUL, or COIN... Payoneer doesn't like that.",
    icon: <AiOutlineInfoCircle />,
  },
  {
    date: "Step 5",
    title: "Transaction completion",
    content:
      "Usually after sending Payoneer, it takes 5-7 minutes to complete the transaction. It can also take longer depending on the system. Leave me positive feedback, and I will do the same!",
    icon: <FaCheck />,
  },
  {
    date: "Step 5",
    title: "No credit card balance",
    content:
      "Don't accept payment by credit card balance. If you sent it on purpose, I reserve the right to ask you to cancel the transaction and refund only 50% of the deposited amount.",
    icon: <AiOutlineWarning />,
  },
  {
    date: "Important",
    title: "Important Note",
    content:
      "For whatever reason, I do not accept transactions in 'Upcoming' / 'Pending' status. I only accept transactions in 'Completed' status, and funds are added to my balance.",
    icon: <AiOutlineInfoCircle />,
  },
  {
    date: "Step 6",
    title: "Large quantity",
    content:
      "If you need a large quantity, message me first with the quantity you need, and you will get the best price.",
    icon: <AiTwotoneNotification />,
  },
  {
    date: "Long-term partner",
    title: "Looking for long-term partner",
    content: "We are looking for a long-term partner! AVAILABLE 500K EVERY DAY. IF YOU NEED A LARGE QUANTITY LET ME KNOW.",
    icon: <FaUser />,
  },
];