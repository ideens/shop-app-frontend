import React from 'react'
import { Nav, NavItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { NavLink } from 'react-router-dom'

const FormSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className="justify-content-center mb-2" style={{ minWidth: '400px' }}>
      <NavItem>
        {step1 ? (
          <LinkContainer to="/login">
            <Nav.Link className="px-2">Login</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link className="px-2" disabled>
            Login
          </Nav.Link>
        )}
      </NavItem>
      <NavItem>
        {step2 ? (
          <LinkContainer to="/shipping">
            <Nav.Link className="px-2">Shipping</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link className="px-2" disabled>
            Shipping
          </Nav.Link>
        )}
      </NavItem>
      <NavItem>
        {step3 ? (
          <LinkContainer to="/payment">
            <Nav.Link className="px-2">Payment</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link className="px-2" disabled>
            Payment
          </Nav.Link>
        )}
      </NavItem>
      <NavItem>
        {step4 ? (
          <LinkContainer to="/confirm">
            <Nav.Link className="px-2">Confirm order</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link className="px-2" disabled>
            Confirm order
          </Nav.Link>
        )}
      </NavItem>
    </Nav>
  )
}

export default FormSteps
