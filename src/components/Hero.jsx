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
            <h1 className="heading my-2">Effectiveness of Businesses</h1>
            <p className="paraText my-3">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil
              nesciunt exercitationem sint debitis praesentium quam itaque? Eos
              impedit dolores voluptate autem animi quidem modi perspiciatis!
            </p>
            <Link href="/about" passHref>
              <Button variant="success">Explore Now</Button>
            </Link>
          </Col>
          <Col md={6} className="order-1 order-md-2 d-none d-md-block text-center">
            <Image src="/Heroimg.png" alt="" height={350} width={500} className='bg-none'/>
          </Col>
        </Row>
      </Container>
      
    </section>
  );
};

export default Hero;
