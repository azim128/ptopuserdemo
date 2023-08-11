/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import Footer from "@/components/Footer";
import BasicNavbar from "@/components/Navbar";
import Profile from "@/components/profile/Profile";
import SignIN from "@/components/profile/SignIN";
import SignUp from "@/components/profile/SignUp";

import { useSearchParams } from "next/navigation";

const page = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("page");
  // console.log(search);
  return <main className="hero-section" style={{minHeight:'100vh'}}>
   <header>
        <BasicNavbar />
      </header>
    
    {search==='signin'&&<SignIN/>}
        {search==='signup'&&<SignUp/>}
        {search===null && <Profile/>}

        
        
  </main>;
};

export default page;
