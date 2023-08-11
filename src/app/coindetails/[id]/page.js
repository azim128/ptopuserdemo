
import BuyPage from "@/components/Singlecoin/BuyPage";
import SellPage from "@/components/Singlecoin/SellPage";
const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;


export async function generateMetadata({ params: { id },searchParams }) {
  // fetch data
  const coindata = await fetch(`https://${serverUrl}/api/payment/single-method/${id}/`).then((res) => res.json())
 
  const {page}=searchParams
 
  return {
    title: `PTOPA-${coindata.name}-${page}`,
    
  }
}
 


const page = async({ params: { id },searchParams }) => {
  const data = coindata(id)
    const singleCoin = await data;
   
    const {page}=searchParams
  
  return <main className="hero-section" style={{minHeight:'100vh'}}>
     

        {page==='sell'&&<SellPage data={singleCoin}/>}
        {page==='buy'&&<BuyPage data={singleCoin}/>}
  </main>;
};

export default page;

async function coindata(id) {
  const res = await fetch(`https://${serverUrl}/api/payment/single-method/${id}/`,{next:{revalidate:10}})
  return res.json()
}
