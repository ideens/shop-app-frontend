import React from 'react'
import { Navbar, Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
  return (
    <Navbar fixed="bottom">
      <Container>
        <Row>
          <Col className="text-center py-3">LinkedIn etc.</Col>
        </Row>
      </Container>
    </Navbar>
  )
}

export default Footer
