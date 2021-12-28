import { useState } from 'react'
import { Offcanvas, Nav } from 'react-bootstrap'

const Sidebar = () => {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <>
      <i className="fas fa-bars text-dark mr-3" onClick={handleShow}></i>

      <Offcanvas
        show={show}
        onHide={handleClose}
        className="card text-black bg-light"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Contact</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="justify-content-end flex-grow-1 pe-3">
            <Nav.Link href="#action1" className="text-dark">
              Commissions
            </Nav.Link>
            <Nav.Link href="#action2" className="text-dark">
              Newsletter
            </Nav.Link>
            <Nav.Link href="#action2" className="text-dark">
              Workshops
            </Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}

export default Sidebar
