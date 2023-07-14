import { Container, Row, Col } from './ReactBootstrap';

const Footer = () => {
  return (
    <Container fluid className='py-4'>
      <Row>
        <Col className="heading3 text-center">
          © Copyright PtoP. All Rights Reserved
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
