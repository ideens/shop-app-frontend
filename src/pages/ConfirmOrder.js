import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import {
  Button,
  ListGroup,
  Image,
  Card,
  Row,
  Col,
  ListGroupItem,
} from 'react-bootstrap'
import FormSteps from '../components/FormSteps'
import AlertMessage from '../components/AlertMessage'
import { createOrder } from '../actions/orderActions'
import { ORDER_CREATE_RESET } from '../constants/orderConstants'

const ConfirmOrder = () => {
  const navigate = useNavigate()
  const orderCreate = useSelector((state) => state.orderCreate)
  const { success, order, error } = orderCreate
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)

  cart.totalPrice = cart.cartItems
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2)

  const pay = JSON.parse(localStorage.getItem('paymentMethod'))

  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`)
      dispatch({ type: ORDER_CREATE_RESET }) //need to reset cart and order
    }
  }, [success, navigate])

  const orderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        totalPrice: cart.totalPrice,
      })
    )
  }

  return (
    <div>
      <FormSteps step1 step2 step3 step4 />
      <h3>Confirm Order</h3>
      <Row>
        <Col md={8}>
          <ListGroup>
            <ListGroupItem>
              <h5>Shipping Address</h5>
              <div className="d-flex flex-column gap-0">
                <p>
                  {cart.shippingAddress.address}
                  <br />
                  {cart.shippingAddress.postcode}
                  <br />
                  {cart.shippingAddress.city}
                  <br />
                  {cart.shippingAddress.country}
                </p>
              </div>
            </ListGroupItem>
          </ListGroup>
          <ListGroup className="mt-2" variant="flush">
            <ListGroupItem>
              <h5>Payment Method</h5>
              <div className="d-flex flex-column gap-0">
                <p>
                  <i className="fab fa-paypal"></i>
                  {cart.paymentMethod}
                </p>
              </div>
            </ListGroupItem>
          </ListGroup>
          <ListGroup className="mt-2">
            <ListGroupItem>
              <h5>Order Items</h5>
              {cart.cartItems.length === 0 ? (
                <AlertMessage heading="Oops!" variant="warning">
                  Your cart is empty
                </AlertMessage>
              ) : (
                <ListGroup>
                  {cart.cartItems.map((item, id) => (
                    <ListGroupItem key={id}>
                      <Row>
                        <Col md={2}>
                          <Image
                            src={`${process.env.REACT_APP_BASE_URL}${item.image}`}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col md={7}>
                          <Link
                            to={`/product/${item.product}`}
                            style={{ textDecoration: 'none' }}
                          >
                            <h6>{item.name}</h6>
                          </Link>
                        </Col>
                        <Col md={3}>
                          {item.quantity} x £{item.price}
                        </Col>
                      </Row>
                      <hr className="mt-0 mb-0" style={{ color: 'white' }} />
                    </ListGroupItem>
                  ))}
                </ListGroup>
              )}
            </ListGroupItem>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card className="card bg-light mb-3">
            <ListGroup>
              <ListGroupItem className="text-dark my-0">
                <h3>Your order</h3>
              </ListGroupItem>
              <ListGroupItem className="text-dark my-0 py-0">
                <h6>Total price:</h6>
              </ListGroupItem>
              <ListGroupItem className="text-dark pt-0">
                <h1>£{cart.totalPrice}</h1>
              </ListGroupItem>
              <ListGroupItem>
                {error && <AlertMessage variant="danger">{error}</AlertMessage>}
              </ListGroupItem>
              <ListGroupItem className="d-grid gap-2 pt-1">
                <button
                  type="button"
                  onClick={orderHandler}
                  className="btn-dark"
                  style={{
                    borderRadius: '8px',
                    height: '40px',
                  }}
                >
                  Confirm Order
                </button>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default ConfirmOrder
