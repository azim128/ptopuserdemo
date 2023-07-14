'use client'
import Link from 'next/link';
import {Container,Nav,Navbar,NavDropdown} from '@/components/ReactBootstrap';
import { useContext } from 'react';
import AuthContext from '@/context/AuthContext';
import { usePathname } from 'next/navigation'


function BasicNavbar() {
  const pathname = usePathname()
  
  const {user,logoutUser} =useContext(AuthContext)
  return (
    <Navbar bg="light" expand="md" className='boxShadow'>
      <Container>
        <Navbar.Brand as={Link} href="/">PTOP</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} href="/" className={pathname==='/'&&`active`}>Home</Nav.Link>
            <Nav.Link as={Link} href="/about" className={pathname==='/about'&&`active`}>About</Nav.Link>
            <Nav.Link as={Link} href="/contact" className={pathname==='/contact'&&`active`}>Contact</Nav.Link>
            <NavDropdown title="👤" id="basic-nav-dropdown">
              {!user?<>
                <NavDropdown.Item as={Link} href="/profile?page=signin">Sign In</NavDropdown.Item>
              <NavDropdown.Item as={Link} href="/profile?page=signup">Sign Up</NavDropdown.Item>
              </>:<>
              <NavDropdown.Item as={Link} href="/profile">Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item >{user?.name}</NavDropdown.Item>
              
              <NavDropdown.Item onClick={logoutUser}>
                Log Out
              </NavDropdown.Item>
              </>}
              
              
              
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicNavbar;