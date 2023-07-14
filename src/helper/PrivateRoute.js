'use client'

import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';

const PrivateRoute = ({ children }) => {
    const authTokens = Cookies.get("authToken");
    const router = useRouter();
  
    // Check if the user is authenticated, otherwise redirect to the login page
    if (!authTokens) {
      router.push("/profile?page=signin");
      return null;
    }
  
    return children;
  };
  
  export default PrivateRoute;
  