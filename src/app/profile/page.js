/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import BasicNavbar from "@/components/Navbar";
import Profile from "@/components/profile/Profile";
import SignIN from "@/components/profile/SignIN";
import SignUp from "@/components/profile/SignUp";

import { useSearchParams } from "next/navigation";

const page = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("page");
  // console.log(search);
  return <>
   <header>
        <BasicNavbar />
      </header>
    
    {search==='signin'&&<SignIN/>}
        {search==='signup'&&<SignUp/>}
        {search===null && <Profile/>}
        
  </>;
};

export default page;
