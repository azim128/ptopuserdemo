'use client'
// Signup.jsx

import { Container, Form, Button } from "@/components/ReactBootstrap";
import styles from "./form.module.css";
import Link from "next/link";

import { useContext, useState } from "react";
import AuthContext from "@/context/AuthContext";

const SignUp = () => {
  const {handleSignup}=useContext(AuthContext)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  const handleSignupform = (e) => {
    e.preventDefault();

    handleSignup(name, email, password, confirmPassword);
  };

  

  return (
    <Container  style={{ minHeight: "75vh" }}>
      <main className={styles.wrapper}>
      <form onSubmit={handleSignupform }>
      <h1 className="my-4">Create Your Account</h1>

      <div>
        <input
          type="text"
          placeholder="Name"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div>
        <input
          type="email"
          placeholder="name@example.com"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div>
        <input
          type="password"
          placeholder="Enter Password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <div>
        <input
          type="password"
          placeholder="Confirm Password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>

      <button type="submit" className={styles.submitbtn}>Sign up</button>

      <p className="my-3">
        If you have an account,
        <Link href="profile?page=signin">Sign In</Link>
      </p>
    </form>
      </main>
      
    </Container>
  );
};

export default SignUp;
