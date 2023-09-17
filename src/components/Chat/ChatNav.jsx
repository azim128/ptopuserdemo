import Link from "next/link";
import styles from "./chat.module.css";
import MobileCanvas from "./MobileCanvas";
import { Container, Nav, Navbar, Button } from "@/components/ReactBootstrap";
const ChatNav = () => {
  return (
    
        <Navbar variant="dark" className={styles.chatHeader}>
        <Container fluid>
          <div className=" d-block d-md-none absoluteCanvas">
            <MobileCanvas />
          </div>
          <Nav className="ms-auto">
            <Nav.Link as={Link} href="/" className={styles.navLink}>
              🏠<span className="d-none d-md-inline-block">Home</span>
            </Nav.Link>
            <Nav.Link href="/">
              💬 <span className="d-none d-md-inline-block">Admin</span>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    
  )
}

export default ChatNav