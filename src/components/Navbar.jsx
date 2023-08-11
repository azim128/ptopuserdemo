'use client'
import Link from 'next/link';
import {Container,Nav,Navbar,NavDropdown} from '@/components/ReactBootstrap';
import { useContext } from 'react';
import AuthContext from '@/context/AuthContext';
import { usePathname } from 'next/navigation'
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';


function BasicNavbar() {
  const pathname = usePathname()
  const {user,logoutUser} =useContext(AuthContext)
  const [isSticky, setIsSticky] = useState(false);
  const navbarRef = useRef(null);
  useEffect(() => {
    const handleScroll = () => {
      const navbar = navbarRef.current;
      if (navbar && window.scrollY > 200) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <Navbar  expand="md" className={`mainNav py-3 ${isSticky ? 'sticky' : ''}`} ref={navbarRef}>
      <Container>
        <Navbar.Brand as={Link} href="/" className='text-light'>PTOP</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className='text-center mt-5 mt-md-0 '>
          <Nav className="ms-auto">
            
            <Nav.Link as={Link} href="/about" className={`text-light ${pathname==='/about'&&`active`}`}>About</Nav.Link>
            <Nav.Link as={Link} href="/contact" className={`text-light ${pathname==='/contact'&&`active`}`}>Contact</Nav.Link>
           
              {!user?<>
                <Nav.Link as={Link} href="/profile?page=signin" className='signinbutton'>Log In</Nav.Link>
              <Nav.Link as={Link} href="/profile?page=signup" className='signupbutton'>Sign Up</Nav.Link>
              </>:<>
              <Nav.Link as={Link} href="/profile" className='text-light'>Profile</Nav.Link>
              <NavDropdown.Divider />
              {/* <Nav.Link >{user?.name}</Nav.Link> */}
              
              <Nav.Link onClick={logoutUser} className='text-light'>
                Log Out
              </Nav.Link>
              </>}
              
              
              
          
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicNavbar;