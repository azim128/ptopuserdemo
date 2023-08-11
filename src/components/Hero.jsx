import { Container, Row, Col, Button } from '@/components/ReactBootstrap';
import Image from 'next/image';
import Link from 'next/link';
import styles from './hero.module.css'

const Hero = () => {
  return (
    <section className={`container-fluid ${styles.section1} `}>
      <Container >
        <Row>
          <Col md={6} className={`order-2 order-md-1 align-middle my-auto py-md-5 py-lg-0 text-center ${styles.herocontentLeft}`}>
            <h1 className={`${styles.heading} my-2`}>Experience of </h1>
            <h1 className={`${styles.heading} my-2`}>Digital Transection</h1>
            <p className="paraText text-light my-3">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil
              nesciunt exercitationem sint debitis praesentium quam itaque? Eos
              impedit dolores voluptate autem animi quidem modi perspiciatis!
            </p>
            <Link href={'/about'}>
              <button className={styles.heroButton}>
                Explore Now
              </button></Link>
            
          </Col>
          <Col md={6} className="order-1 order-md-2 d-none d-md-block text-center position-relative">
            <Image src="/Heroimg.png" alt="" height={350} width={500} className='bg-none'/>
            <Image src="/cross.png" alt="" height={15} width={15} className={`bg-none ${styles.image1}`}/>
            <Image src="/cross.png" alt="" height={15} width={15} className={`bg-none ${styles.image4}`}/>
            <Image src="/cross.png" alt="" height={15} width={15} className={`bg-none ${styles.image5}`}/>
            <Image src="/style-1.png" alt="" height={50} width={156} className={`bg-none ${styles.image2}`}/>
            <Image src="/style-2.png" alt="" height={50} width={156} className={`bg-none ${styles.image3}`}/>
          </Col>
        </Row>
      </Container>
      
    </section>
  );
};

export default Hero;
