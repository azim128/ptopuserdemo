"use client"

import { usePathname, useRouter } from "next/navigation";
import {toast} from "react-toastify"
const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

const Page = async() => {
    const router = useRouter();
  const pathname = usePathname();

    const handelsubmit=async()=>{
        try {
            const response = await fetch(`https://${serverUrl}${pathname}/`, {
              method: 'POST',
            });
      
            if (response.ok) {
              toast.success('Verification complete go to Log in');
              router.push('/profile?page=signin')
            } else {
              const errorData = await response.json();
              toast.error(`Failed to create new account: ${errorData.message}`);
            }
          } catch (error) {
            toast.error('An error occurred while verifying mail');
          }
    }
  return (
    <main>
        <div>
          <h1>Verify your mail</h1>
          {/* <button onClick={handelsubmit} >
            
          </button> */}
          This function available Soon...................................... 
        </div>
    </main>
  )
}

export default Page