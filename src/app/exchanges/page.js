/* eslint-disable react-hooks/rules-of-hooks */
'use client'

import MainNavbar from "@/components/nav/Navbar"
import BuyOrder from "@/components/multisteporder/BuyOrder"
import SellOrder from "@/components/multisteporder/SellOrder"
import PrivateRoute from "@/helper/PrivateRoute"
import { useSearchParams } from 'next/navigation'

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
const page = () => {
  
const searchParams = useSearchParams()
  const search = searchParams.get('page')
  
  
  

  return (
    <PrivateRoute>
      <main className="hero-section" style={{minHeight:'100vh'}}>
   <header>
        <MainNavbar />
      </header>
       
        {search==='sell'&&<SellOrder/>}
        {search==='buy'&&<BuyOrder/>}
        
        </main>
        
        
        </PrivateRoute>
  )
}

export default page