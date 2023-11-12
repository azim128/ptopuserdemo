import styles from '@/components/info/info.module.css'

const Info = () => {
  return (
    <div className={`text-white  position-relative ${styles.marqueeContainer}`}>
        {/* <div className="position-absolute bg-info py-2 px-5 marquee">AlERT</div> */}
        <marquee className="py-1 d-flex align-items-center marqueeText">
          “PTOP” is a trademark of Eaton Consulting FZE. Eaton Consulting
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
  )
}

export default Info