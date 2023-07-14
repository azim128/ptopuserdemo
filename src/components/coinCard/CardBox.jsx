'use client'
import Image from "next/image";
import Link from "next/link";
import { Card , Button } from "@/components/ReactBootstrap";

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

const CardBox = ({ coinImg, coinName, coinLink, coinbuyPrice,coinsellPrice }) => {
  
  return (
    <Card className="text-center d-flex justify-content-center align-items-center py-5">
      <Image
        className="img-fluid rounded"
        src={`https://${serverUrl}${coinImg}`}
        alt="Title"
        height={100}
        width={100}
      />
      <Card.Title className="pt-2 heading4">{coinName}</Card.Title>
      <div>
        <Link href={`/coindetails/${coinLink}?page=buy`} passHref>
          <Button variant="primary" className="me-2">
            Buy
          </Button>
        </Link>
        <Link href={`/coindetails/${coinLink}?page=sell`} passHref>
          <Button variant="secondary" className="ms-2">
            Sell
          </Button>
        </Link>
      </div>
    </Card>
  );
};

export default CardBox;
