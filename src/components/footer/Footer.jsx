'use client'
import Image from 'next/image';
import { Container, Row, Col } from '../ReactBootstrap';
import { AiFillFacebook, AiOutlineSend, AiFillYoutube } from 'react-icons/ai';
import styles from "@/components/footer/footer.module.css"
const Footer = () => {
  return (
    <footer className="text-light py-4 pt-5" style={{background: "#0f101e"}}>
      <Container>
        <Row>
          <Col md={4}>
            <Image src={'/PTOP With Tagline.png'} alt='logo' width={200} height={80}/>
            <p className='mt-4'>
            Buy / Sell Payoneer USD For USDT<br/> Quickly & Safely
            </p>
          </Col>
          <Col md={4}>
            <h5>Important Links</h5>
            <ul className="list-unstyled">
              <li>
                <a href="/about" className='text-decoration-none'>About Us</a>
              </li>
              <li>
                <a href="/about">contact us</a>
              </li>
              <li>
                <a href="/about">privacy policy</a>
              </li>
              <li>
                <a href="/about">Terms & Conditions</a>
              </li>
              
              {/* Other links */}
            </ul>
          </Col>
          <Col md={4}>
            <h3>Community</h3>
            <ul className='list-unstyled'>
            <li>X/Twitter</li>
            <li>Telegram Chat</li>
            <li>Telegram News</li>
            <li>Facebook</li>
            <li>Discord</li>
            </ul>
            
          </Col>

        </Row>

  
  
 
  <p className="text-center text-light p-3" style={{backgroundColor: "rgba(0, 0, 0, 0.2)",fontWeight:'300',fontSize:'14px'}}>
    © 2023 Copyright PTOP. All Rights Reserved.
  </p>
      </Container>
    </footer>
  );
};

export default Footer;
