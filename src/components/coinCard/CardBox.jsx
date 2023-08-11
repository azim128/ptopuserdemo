'use client'
import Image from "next/image";
import Link from "next/link";
import styles from './coincard.module.css'
import { Card , Button, Col } from "@/components/ReactBootstrap";

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

const CardBox = ({ coinImg, coinName, coinLink, coinbuyPrice,coinsellPrice }) => {
  
  return (
    <div className="d-flex justify-content-between align-items-center">
    <Col lg={6} >

<Card className="text-center d-none d-lg-flex justify-content-center align-items-center position-relative">
      <Image
         className={`img-fluid rounded ${styles.Image}`}
        src={'/payoneericon.png'}
        alt="Title"
        height={100}
        width={100}
      />
      <Image
        className={`img-fluid rounded ${styles.mainImage}`}
        src={"/main-img.png"}

        alt="Title"
        height={470}
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
    <Col lg={6}>
    <Card className="text-center bg-dark ps-2 py-5  d-flex justify-content-center align-items-center position-relative">
      <div className="cardContent">
      <h6 className= {styles.subheading}>TRANSACTIONS</h6>
      <Image
        className="img-fluid rounded my-3"
        src={`https://${serverUrl}${coinImg}`}
        alt="Title"
        height={100}
        width={100}
      />
    <h1 className= {styles.heading}>Buy / Sell USDT with</h1> <h1 className= {styles.heading}> {coinName} quickly and safely</h1>
    <p className="text-light my-3">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium repellat ipsa doloremque corrupti, aspernatur temporibus tempore fugit modi perferendis sunt.</p>
    </div>
    <div>

    </div>
    <div className="d-flex w-100 justify-content-center align-items-center ">
        <Link href={`/coindetails/${coinLink}?page=buy`} passHref>
          <button className={`${styles.cardButton} me-3`}>
            Buy <span className="d-none d-lg-inline-block">Coin</span>
          </button>
        </Link>
        <Link href={`/coindetails/${coinLink}?page=sell`} passHref>
          <button className={`${styles.cardButton2} ms-3`}>
            Sell <span className="d-none d-lg-inline-block">Coin</span>
          </button>
        </Link>
      </div>
      </Card>
    </Col>
    </div>
    
  );
};

export default CardBox;
