'use client'
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Container, Form, Button } from "@/components/ReactBootstrap";
import styles from "@/components/profile/form.module.css";

import { toast } from "react-toastify";
import { IoIosMail } from "react-icons/io";
import { useState } from "react";
import MainNavbar from "@/components/nav/Navbar";
import Image from "next/image";
const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
const SignIn = () => {
    const router = useRouter();
  const [email, setEmail] = useState("");

  const handleForget = async (e) => {
    e.preventDefault();

    try {
      // Make the POST request to the specified URL
      const response = await fetch(`https://${serverUrl}/api/user/send-reset-password-email/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email, // Send the email from the state variable
        }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Password reset email sent successfully");
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
      toast.error("Something went wrong");
    }
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  return (
    <main className="hero-section" style={{minHeight:'100vh'}}>
   <header>
        <MainNavbar />
      </header>
    <Container style={{ minHeight: "75vh" }}>
      <main className={styles.wrapper}>
        <Form onSubmit={handleForget}>
        <Link href={'/'}>
            <Image src='/PTOP.png' height={40} width={100} alt="ptop-logo"></Image>
          </Link>
          <h6 className="my-4 w-50 mx-auto text-light">Reset password by email</h6>

          <div className={styles.IconDiv}>
            <input
              type="email"
              name="email"
              id="floatingInput"
              value={email}
              onChange={handleChangeEmail}
              placeholder="Enter Your Email Address"
            />
            <IoIosMail className={styles.inputIcon} />
          </div>

          <Button className={styles.submitbtn} type="submit">
            Reset Password
          </Button>

          <p className={`${styles.fromtext} my-3`}>
            Back to sign in page,{" "}
            <Link href="/profile?page=signin" className={styles.linktext}>
              Sign In
            </Link>
          </p>
        </Form>
      </main>
    </Container>
    </main>
  );
};

export default SignIn;
