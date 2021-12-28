import React from 'react'
import { Nav, Navbar, Container, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Sidebar from './Sidebar'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../actions/userActions.js'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/artisan-logo.png'

const Header = () => {
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  return (
    <header>
      <Navbar
        className="navbar navbar-expand-lg navbar-light bg-light"
        collapseOnSelect
      >
        <Container className="container-fluid">
          {/* <Sidebar /> */}
          <LinkContainer to="">
            <Navbar.Brand className="px-3">
              <img src={logo} alt="Logo" style={{ width: '200px' }} />
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <div style={{ display: 'flex' }} className="align-items-end">
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav>
                <LinkContainer to="/cart">
                  <Nav.Link>
                    <i className="fas fa-shopping-cart"></i> Cart
                  </Nav.Link>
                </LinkContainer>

                {userInfo ? (
                  <NavDropdown title={userInfo.name} id="username">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>
                        <i className="far fa-user"></i> Orders
                      </NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={handleLogout}>
                      <i className="fas fa-sign-out-alt"></i> Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <LinkContainer to="/login">
                    <Nav.Link>
                      <i className="fas fa-sign-in-alt"></i> Login
                    </Nav.Link>
                  </LinkContainer>
                )}

                {userInfo && userInfo.isAdmin && (
                  <NavDropdown title="Admin" id="admin-menu">
                    <LinkContainer to="/admin/userlist">
                      <NavDropdown.Item>
                        <i className="fas fa-users"></i> Users
                      </NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/productlist">
                      <NavDropdown.Item>
                        <i className="fas fa-images"></i> Products
                      </NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/orderlist">
                      <NavDropdown.Item>
                        <i className="fas fa-tags"></i> Orders
                      </NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                )}
              </Nav>
            </Navbar.Collapse>
          </div>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
