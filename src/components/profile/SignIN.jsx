'use client'// SignIn.jsx
import Link from "next/link";
import { Container, Form, Button } from "@/components/ReactBootstrap";
import styles from "./form.module.css";
import { useContext, useState } from "react";
import AuthContext from "@/context/AuthContext";
import { toast } from "react-toastify";
import { IoMdEye, IoMdEyeOff, IoIosMail } from "react-icons/io";
const SignIn = () => {
  const { loginUser } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await loginUser(e);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <Container style={{ minHeight: "75vh" }}>
      <main className={styles.wrapper}>
        <Form onSubmit={handleLogin}>
          <h1 className="my-4">Login to Your Account</h1>

          <div className={styles.IconDiv}>
            <input
              type="email"
              name="email"
              id="floatingInput"
              placeholder="Enter Your Email Address"
            />
             <IoIosMail className={styles.inputIcon} />
          </div>
          <div className={styles.passwordDiv}>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="floatingPassword"
              placeholder="Password"
            />
            {/* Add the show/hide password toggle button */}
            <button
              type="button"
              onClick={handlePasswordVisibility}
              className={styles.passwordToggle}
            >
              {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
            </button>
          </div>


          <Button className={styles.submitbtn} type="submit">
            Sign in
          </Button>
          <p className={`${styles.fromtext} my-3`}>
            <Link href="/profile/forget" className={styles.linktext}>
              Forgot Password
            </Link>
          </p>
          <p className={`${styles.fromtext} my-3`}>
            If you do not have an account,{" "}
            <Link href="/profile?page=signup" className={styles.linktext}>
              Sign Up
            </Link>
          </p>
        </Form>
      </main>
    </Container>
  );
};

export default SignIn;
