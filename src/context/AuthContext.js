'use client'
import { createContext, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Cookies from 'js-cookie';
import { toast } from "react-toastify";
import useSWR from 'swr';
const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("page");
  // console.log('..................',search)
  const [authTokens, setAuthTokens] = useState(null);
  const [tokens, setTokens] = useState(null);
  const [user, setUser] = useState(null);




  useEffect(() => {
    const storedAuthTokens = Cookies.get("authToken");
    const storedUser = Cookies.get("user");
    const storedToken = Cookies.get("token");

    if (storedAuthTokens && storedUser) {
      setAuthTokens(JSON.parse(storedAuthTokens));
      setUser(JSON.parse(storedUser));
      setTokens(JSON.parse(storedToken))
    }
  }, []);

  

  let handleSignup = async (e) => {
    e.preventDefault();
    try {
      let response = await fetch(`https://${serverUrl}/api/user/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: e.target.email.value,
          name: e.target.name.value.trim(),
          tc: "True",
          password: e.target.password.value,
          password2: e.target.password2.value,
        }),
      });
      const data = await response.json();
      if (response.status === 201) {
        router.push("/profile?page=signin");
        toast.success("Profile Create successful! Cheack Your mail");
      } else {
        if (data && data.errors) {
          // Extract the first error message from the 'errors' object
          const errorKeys = Object.keys(data.errors);
          const errorMessage = data.errors[errorKeys[0]][0];
          toast.error(errorMessage);
        } else {
          toast.error("Something went wrong");
        }
      }
    }  catch (error) {
      alert("Error creating user: " + error.message);
      toast.error("Somethig went Worng in creating Profile")
    }
  };

  const loginUser = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`https://${serverUrl}/api/user/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: e.target.email.value,
          password: e.target.password.value,
        }),
      });

      const data = await response.json();

      if (response.status === 200) {
        setAuthTokens(data);
        setUser(data.profile_data);
        Cookies.set("authToken", JSON.stringify(data), { expires: 7 });
        Cookies.set("user", JSON.stringify(data.profile_data), { expires: 7 });
        Cookies.set("token", JSON.stringify(data.token.access), { expires: 7, sameSite: "none", secure: true });
        toast.success("Logged in successfully!");
        if(search==='buy'){
          router.push("/coindetails/1?page=buy")
        }else if(search==='sell'){
          router.push("/coindetails/1?page=sell")
        }else{
          router.push("/");
        }
        
      } else {
        if (data && data.errors) {
          // Extract the first error message from the 'errors' object
          const errorKeys = Object.keys(data.errors);
          const errorMessage = data.errors[errorKeys[0]][0];
          toast.error(errorMessage);
        } else {
          toast.error("Something went wrong");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    Cookies.remove("authToken");
    Cookies.remove("user");
    Cookies.remove("token");
    toast.success("Logged out successfully!");
    router.push("/profile?page=signin");
  };

  const [ordermassage, setOrderMessage] = useState(null);


  return (
    <AuthContext.Provider
      value={{
        authTokens,
        user,
        tokens,
        loginUser,
        logoutUser,
        handleSignup,
        
        ordermassage,
        setOrderMessage
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
