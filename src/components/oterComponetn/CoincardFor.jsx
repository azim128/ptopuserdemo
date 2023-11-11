'use client'
import React from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';

const TwoCardSection = () => {
  return (
    <Container>
      <Row >
        <Col md={6} sm={12} >
          <Card className="rounded border d-flex align-items-center justify-content-center flex-column gap-2 py-3" style={{background:"#0f101e"}}>
          <Card.Img variant="top" src="/paypal.png" style={{ height: '100px', width: '100px', objectFit: 'cover' }} className="border rounded-circle p-3" />
          <Card.Body className="mt-4 text-center">
            <Card.Title className="text-light mb-2">Paypal</Card.Title>
            <Card.Text className="text-light">
              Service Coming Soon.
            </Card.Text>
            <Button variant="dark" className="me-2 disablebutton text-warning" disabled>Buy</Button>
            <Button variant="dark" className="ms-2 disablebutton text-warning" disabled>Sell</Button>
          </Card.Body>
          </Card>
        </Col>
        <Col md={6} sm={12} >
          <Card className="rounded border d-flex align-items-center justify-content-center flex-column gap-2 py-3" style={{background:"#0f101e"}}>
          <Card.Img variant="top" src="/weisenham.png" style={{ height: '100px', width: '100px', objectFit: 'cover' }} className="border rounded-circle p-3" />
          <Card.Body className="mt-4 text-center">
            <Card.Title className="text-light mb-2">Wise</Card.Title>
            <Card.Text className="text-light">
              Service Coming Soon.
            </Card.Text>
            <Button variant="dark" className="me-2 disablebutton text-warning" disabled>Buy</Button>
            <Button variant="dark" className="ms-2 disablebutton text-warning" disabled>Sell</Button>
          </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default TwoCardSection;
