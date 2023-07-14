import Hero from "@/components/Hero";
import BasicNavbar from "@/components/Navbar";
import Link from "next/link";
import { Col, Container, Row } from "@/components/ReactBootstrap";
import CardBox from "@/components/coinCard/CardBox";
import Footer from "@/components/Footer";

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export default async function Home() {
  const data = await getData()
  console.log(data)
  return (
    <>
      <header>
        <BasicNavbar />
      </header>
      <Hero />
      <div className="bg-primary bg-gradient text-white  position-relative">
        <div className="position-absolute bg-info py-2 px-5 marquee">AlERT</div>
        <marquee className="py-2 d-flex align-items-center">
          “NOONES” is a trademark of Eaton Consulting FZE. Eaton Consulting
          FZE has no relation to MoneyGram, Western Union, Payoneer,
          WorldRemit, Paxum, PayPal, Amazon, OkPay, Payza, Walmart, Reloadit,
          Perfect Money, WebMoney, Google Wallet, BlueBird, Serve, Square
          Cash,NetSpend, Chase QuickPay, Skrill, Vanilla, MyVanilla,
          OneVanilla, Neteller, Venmo, Apple, ChimpChange or any other payment
          method. We make no claims about being supported by or supporting
          these services. Their respective wordmarks and trademarks belong to
          them alone. Official mailing address:BIZ00318 Compass Building, Al
          Shohada Road, AL Hamra Industrial Zone-FZ, Ras Al Khaimah, United
          Arab Emirates
        </marquee>
      </div>
      <Container className="my-5 py-5">
        <Row className="justify-content-center">
          {data?.map((coin) => (
            <Col key={coin.id} sm={6} md={4} lg={3} className="mb-3">
              <CardBox
                coinImg={coin.icon}
                coinName={coin.name}
                coinbuyPrice={coin.buy_rate}
                coinsellPrice={coin.sell_rate}
                coinLink={coin.id} />
            </Col>
          ))}
        </Row>
      </Container>
      <Footer/>


    </>
  )
}


async function getData() {
  const res = await fetch(`https://${serverUrl}/api/payment/all-method/`, { next: { revalidate: 10 } })

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json()
}