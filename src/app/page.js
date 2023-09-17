import Hero from "@/components/Hero";
import BasicNavbar from "@/components/Navbar";
import Link from "next/link";
import { Col, Container, Row } from "@/components/ReactBootstrap";
import CardBox from "@/components/coinCard/CardBox";
import Footer from "@/components/Footer";
import Info from "@/components/info/Info";
import TwoCardSection from "@/components/oterComponetn/CoincardFor";

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export default async function Home() {
  const data = await getData();
  console.log(data);
  return (
    <div>
      <Info />
      <main className="hero-section">
        <header>
          <BasicNavbar />
        </header>
        <Hero />

        <Container className="my-5 py-5">
          <Row className="justify-content-center">
            {data?.map((coin) => (
              
                <CardBox  key={coin.id}
                  coinImg={coin.icon}
                  coinName={coin.name}
                  coinbuyPrice={coin.buy_rate}
                  coinsellPrice={coin.sell_rate}
                  coinLink={coin.id}
                />
              
            ))}
          </Row>
        </Container>
        
        <div className="pb-5">
        <TwoCardSection/>
        </div>
        <Footer />
      </main>
    </div>
  );
}

async function getData() {
  const res = await fetch(`https://${serverUrl}/api/payment/all-method/`,{ cache: 'no-store' }, {
    next: { revalidate: 10 },
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
