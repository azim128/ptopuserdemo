'use client'
import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';
import { toast } from "react-toastify";
import useSWR from 'swr';
const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const router = useRouter();

  const [authTokens, setAuthTokens] = useState(null);
  const [user, setUser] = useState(null);


console.log(authTokens)
  const headers = {
    Authorization: `Bearer ${authTokens?.token.access}`,
    Accept:'application/json'
  };

  const fetcher = async (url) => {
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error('Failed to fetch resource');
      }
      const data = await res.json();
    return data;
    } catch (error) {
      
    }
    
    
  };
  const { data, error } = useSWR(authTokens ?`http://${serverUrl}/api/user/messages/${user?.name}_Payoneer/?Accept=application/json&access_token=${authTokens?.token.access}/`:null, fetcher);
   console.log(data)



  useEffect(() => {
    const storedAuthTokens = Cookies.get("authToken");
    const storedUser = Cookies.get("user");

    if (storedAuthTokens && storedUser) {
      setAuthTokens(JSON.parse(storedAuthTokens));
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isStrongPassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSignup = async (name, email, password, confirmPassword) => {
    // Validation checks
    if (name.split(" ").length !== 1) {
      toast.error("Name should be a single word");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!isStrongPassword(password)) {
      toast.error(
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
      );
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Invalid email address");
      return;
    }

    // Continue with signup logic
    try {
      const response = await fetch(`https://${serverUrl}/api/user/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          name,
          tc: "True",
          password,
          password2: confirmPassword,
        }),
      });
      const data = await response.json();
      if (response.status === 201) {
        toast.success("Account created successfully!Check Your Mail");
        router.push("/");
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
      console.log(error);
      toast.error("Something went wrong");
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
        router.push("/");
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

  const {ordermassage,setOrderMessage}= useState(null)

  return (
    <AuthContext.Provider
      value={{
        authTokens,
        user,
        loginUser,
        logoutUser,
        handleSignup,
        chatdata:data,
        ordermassage,
        setOrderMessage
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
