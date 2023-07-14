'use client'// SignIn.jsx
import Link from "next/link";
import { Container, Form, Button } from "@/components/ReactBootstrap";
import styles from "./form.module.css";
import { useContext } from "react";
import AuthContext from "@/context/AuthContext";
import { toast } from "react-toastify";

const SignIn = () => {
  const { loginUser } = useContext(AuthContext);

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

          <Form.Group controlId="formEmail">
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter Your Email Address.."
              autoFocus
            />
          </Form.Group>

          <Form.Group controlId="formPassword">
            <input type="password" name="password" placeholder="Password" autoComplete="password"/>
          </Form.Group>

          <Button className={styles.submitbtn} type="submit">
            Sign in
          </Button>
          <p className={`${styles.fromtext} my-3`}>
            <Link href="/" className={styles.linktext}>
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
