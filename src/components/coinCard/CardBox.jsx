"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "./coincard.module.css";
import { Card, Button, Col } from "@/components/ReactBootstrap";

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

const CardBox = ({coinLink}) => {
  // { coinImg, coinName, coinLink, coinbuyPrice,coinsellPrice }
  return (
    <div className="d-flex justify-content-between align-items-center">
      <Col lg={6} >
        <Card className="text-center d-none d-lg-flex justify-content-center align-items-center position-relative" style={{height:"430px"}}>
          <Image
            className={`img-fluid rounded ${styles.Image}`}
            src={"/payoneericon.png"}
            alt="Title"
            height={100}
            width={100}
          />
          <Image
            className={`img-fluid rounded ${styles.mainImage}`}
            src={"/main-img.png"}
            alt="Title"
            height={400}
            width={456}
          />
          <Image
            className={`img-fluid rounded ${styles.Image2}`}
            src={"/payoneericon.png"}
            alt="Title"
            height={100}
            width={100}
          />
          <Image
            className={`img-fluid rounded ${styles.Image3}`}
            src={"/payoneericon1.png"}
            alt="Title"
            height={100}
            width={100}
          />
        </Card>
      </Col>
      <Col lg={6} className="h-100">
        <Card className="text-center ps-2 py-5  d-flex justify-content-center align-items-center position-relative" style={{height:"430px",background:"#0f101e"}}>
          <div className="cardContent">
            <h6 className={styles.subheading}>PAYONEER</h6>
            <Image
              className="img-fluid rounded my-3"
              src={"/money.png"}
              alt="Title"
              height={100}
              width={100}
            />
            <h1 className={`px-4 pb-4 ${styles.heading}`}>
              Buy / Sell Payoneer USD For USDT Quickly & Safely
            </h1>
          </div>
          <div></div>
          <div className="d-flex w-100 justify-content-center align-items-center ">
            <Link href={`/coindetails/${coinLink}?page=buy`} passHref>
              <button className={`${styles.cardButton} me-3`}>
                Buy <span className="d-none d-lg-inline-block"></span>
              </button>
            </Link>
            <Link href={`/coindetails/${coinLink}?page=sell`} passHref>
              <button className={`${styles.cardButton2} ms-3`}>
                Sell <span className="d-none d-lg-inline-block"></span>
              </button>
            </Link>
          </div>
        </Card>
      </Col>
    </div>
  );
};

export default CardBox;
