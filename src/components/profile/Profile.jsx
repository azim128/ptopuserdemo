import styles from "./form.module.css";
import { Button, Card, Container } from "@/components/ReactBootstrap";
import AuthContext from "@/context/AuthContext";
import Cookies from "js-cookie";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

const Profile = () => {
  const { logoutUser } = useContext(AuthContext);
  const [parsedUser, setParsedUser] = useState(null);
  useEffect(() => {
    const user = Cookies.get("user");
    const parsedUser = user ? JSON.parse(user) : null;
    setParsedUser(parsedUser);
  }, []);
  return (
    <Container style={{ minHeight: "75vh" }}>
      <main
        className={`d-flex justify-content-center align-items-center ${styles.wrapper}`}
      >
        {parsedUser ? (
          <Card style={{ width: "18rem" }}>
            <Card.Img
              variant="top"
              src="/user.png"
              className={styles.profileImage}
            />
            <Card.Body>
              <Card.Title>{parsedUser?.name}</Card.Title>
              <Card.Text>{parsedUser?.email}</Card.Text>
              <Button variant="primary" onClick={logoutUser}>
                Logout
              </Button>
            </Card.Body>
          </Card>
        ) : (
          <div className="d-flex flex-column justify-content-center align-items-center ">
            <h1 className="mb-5">You are Not Logged In. Login first</h1>
            <div className="btn btn-primary">
              <Link href={"/profile?page=signin"}>Sign In</Link>
            </div>
          </div>
        )}
      </main>
    </Container>
  );
};

export default Profile;
