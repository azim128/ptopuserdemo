'use client'
import { useState } from 'react';
import { Modal, Button } from '@/components/ReactBootstrap';
import { BsTelegram, BsWhatsapp } from 'react-icons/bs';
import Link from 'next/link';

function ModalBox({title}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  // Component for "Exchance via Web" content
  const WebExchangeContent = () => (
    <>
      <Modal.Header >
        <Modal.Title className='d-flex flex-column justify-content-center mx-auto'>
          <h3  className='me-2 my-4'>
            Buy via Web
          </h3>
          <Link href="/exchanges?page=buy"  className='btn btn-outline-success'>
            Order Now
          </Link>
        </Modal.Title>
        
      </Modal.Header>
    </>
  );

  // Component for sell page
  const WebExchangeContentSell = () => (
    <>
      <Modal.Header >
        <Modal.Title className='d-flex flex-column justify-content-center mx-auto'>
          <h3  className='me-2 my-4'>
            Sell via Web
          </h3>
          <Link href="/exchanges?page=sell"  className='btn btn-outline-success'>
            Order Now
          </Link>
        </Modal.Title>
        
      </Modal.Header>
    </>
  );

  const DirectContactContent = () => (
    <>
      <Modal.Header >
        <Modal.Title>
          <a href="https://wa.me/8801626457232" target="_blank">
            <BsWhatsapp size={42} color="#0dc143" /> <span className='ms-2'>Message With Whatsapp</span>
          </a> 
        </Modal.Title>
      </Modal.Header>
      <Modal.Header>
        <Modal.Title>
          <a href="https://t.me/azim" target="_blank" className='me-2'>
            <BsTelegram size={42} color="#279fdb" /> <span className='ms-2'> Message With Telegram</span>
          </a>
        </Modal.Title>
      </Modal.Header>
    </>
  );

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
      {title}
      </Button>

      <Modal show={show} onHide={handleClose}>
        
       {title==='Exchance Direct Contact'?
          <DirectContactContent/>:(title==='Buy via Web'?<WebExchangeContent />:<WebExchangeContentSell />)}
  
        <Modal.Footer className='mx-auto'>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalBox;
