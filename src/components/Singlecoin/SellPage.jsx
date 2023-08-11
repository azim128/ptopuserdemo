/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { Container, Row } from "react-bootstrap";
import BasicNavbar from "../Navbar";
import styles from '@/components/Singlecoin/sellBuyPage.module.css'
import Image from "next/image";
import { useState } from "react";
import ModalBox from "../Model";

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

const SellPage = ({data}) => {
  const [currencyA, setCurrencyA] = useState(0);
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
    }
  };
  const exchangeRate = data?.sell_rate;
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
            <h1 className="display-5 fw-bold heading text-light text-body-emphasis">
      
              Exchange Rate : {exchangeRate}
            </h1>
  
            <p className="heading4 my-3">{data?.name}</p>
            <div className="col-md-10 mx-auto">
              <p className="lead mb-4">
                {data?.description}
              </p>
              <div className={`${styles.wrapper} row`}>
                <div className="col-6">
                  <label className="text-left mb-1">I will pay USDT</label>
                  <input
                    type="text"
                    value={currencyA}
                    onChange={handleCurrencyAChange}
                  />
                </div>
                <div className="col-6">
                  <label className="text-left mb-1">and receive USD</label>
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
                <div className="d-flex flex-column flex-sm-row justify-content-center gap-4  align-items-center">
                  <ModalBox title={'Sell via Web'}/>
                  <ModalBox title={'Exchance Direct Contact'}/>
                 
                </div>
                
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </>
  )
}

export default SellPage