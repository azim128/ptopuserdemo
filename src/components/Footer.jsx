'use client'
import React from 'react';
import { Container, Row, Col } from './ReactBootstrap';
import { AiFillFacebook, AiOutlineSend, AiFillYoutube } from 'react-icons/ai';

const Footer = () => {
  return (
    <footer className="text-light py-4 pt-5" style={{background:"#1f1f1f"}}>
      <Container>
        <Row>
          <Col md={4}>
            <h3>About Us</h3>
            <p>
              This is a sample footer section created using React Bootstrap.
            </p>
          </Col>
          <Col md={4}>
            <h3>Links</h3>
            <ul className="list-unstyled">
              <li>
                <a href="/about">About Us</a>
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
            <h3>Social Links</h3>
            {/* <div>
                <a href="/about">FAQ</a>
              </div> */}
            <ul className="list-unstyled d-flex gap-4">
            
              <li>
                <a href="https://www.facebook.com/your-facebook-page" target="_blank" rel="noopener noreferrer">
                  <AiFillFacebook size={30}/> 
                </a>
              </li>
              <li>
                <a href="https://t.me/your-telegram-channel" target="_blank" rel="noopener noreferrer">
                  <AiOutlineSend size={30}/> 
                </a>
              </li>
              <li>
                <a href="https://www.youtube.com/your-youtube-channel" target="_blank" rel="noopener noreferrer">
                  <AiFillYoutube size={30}/>
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
