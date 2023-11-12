'use client'
// Signup.jsx
import { IoMdEye, IoMdEyeOff, IoIosPerson, IoIosMail } from "react-icons/io";
import styles from "./form.module.css";
import Link from "next/link";

import { useContext, useState } from "react";
import AuthContext from "@/context/AuthContext";
import Image from "next/image";

const SignUp = () => {
  const {handleSignup}=useContext(AuthContext)
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  

  return (
    <div >
      <main className={styles.wrapper}>
        <form onSubmit={handleSignup}>
        <Link href={'/'}>
            <Image src='/PTOP.png' height={40} width={100} alt="ptop-logo"></Image>
          </Link>
          <h6 className="mt-2 mb-3 text-light">Create Your Account</h6>

          <div className={styles.IconDiv}>
            <input
              type="name"
              name="name"
              id="floatingInput1"
              placeholder="Name"
            />
            <IoIosPerson className={styles.inputIcon} />
          </div>
          <div className={styles.IconDiv}>
            <input
              type="email"
              name="email"
              id="floatingInput"
              placeholder="name@example.com"
            />
            <IoIosMail className={styles.inputIcon} />
          </div>
          <div className={styles.passwordDiv}>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="floatingPassword"
              placeholder="Enter Password"
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
          <div className={styles.passwordDiv}>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="password2"
              id="floatingPassword1"
              placeholder="Confirm Password"
            />
            {/* Add the show/hide password toggle button */}
            <button
              type="button"
              onClick={handleConfirmPasswordVisibility}
              className={styles.passwordToggle}
            >
              {showConfirmPassword ? <IoMdEyeOff /> : <IoMdEye />}
            </button>
          </div>

          <button className={styles.submitbtn} type="submit">
            Sign up
          </button>
          <p className={`${styles.fromtext}  my-3`}>If you have an account <Link href='/profile?page=signin' className={styles.linktext}>Sign In</Link></p>
        </form>
      </main>
    </div>
  );
};

export default SignUp;
