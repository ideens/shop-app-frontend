import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { useParams } from 'react-router'
import {
  ListGroup,
  Image,
  Card,
  Row,
  Col,
  ListGroupItem,
} from 'react-bootstrap'
import LoadSpinner from '../components/LoadSpinner'
import AlertMessage from '../components/AlertMessage'
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
} from '../actions/orderActions'
import { PayPalButton } from 'react-paypal-button-v2'
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from '../constants/orderConstants'

const OrderPage = () => {
  const [loaded, setLoaded] = useState(false)
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const cart = useSelector((state) => state.cart)

  const orderDetails = useSelector((state) => state.orderDetails)
  const { loading, order, error } = orderDetails

  const orderPay = useSelector((state) => state.orderPay)
  const { loading: loadingPay, success: successPay } = orderPay

  const orderDeliver = useSelector((state) => state.orderDeliver)
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  if (!loading && !error) {
    order.totalPrice = order.orderItems
      .reduce((acc, item) => acc + item.price * item.quantity, 0)
      .toFixed(2)
  }

  const paypalButtonScript = () => {
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src =
      'https://www.paypal.com/sdk/js?client-id=ARSSh0ejARGDHtbeqWdJynonWBqCbdlaptRiFfaqtVU7kA_ApT6-kclfN-ubd6xvDRSWhteaXo3K1Fvp'
    script.async = true
    script.onload = () => {
      setLoaded(true)
    }
    document.body.appendChild(script)
  }

  useEffect(() => {
    if (!order || order._id !== Number(id) || successPay || successDeliver) {
      dispatch({ type: ORDER_PAY_RESET })
      dispatch({ type: ORDER_DELIVER_RESET })

      dispatch(getOrderDetails(id))
    } else if (!order.isPaid) {
      if (!window.paypal) {
        paypalButtonScript()
      } else {
        setLoaded(true)
      }
    }
  }, [order, id, dispatch, successPay, successDeliver])

  const successfulPayment = (paymentResult) => {
    dispatch(payOrder(id, paymentResult))
  }

  const successfulDelivery = () => {
    dispatch(deliverOrder(id))
  }

  return loading ? (
    <LoadSpinner />
  ) : error ? (
    <AlertMessage variant="danger">{error}</AlertMessage>
  ) : (
    <div>
      <h3>Order Summary</h3>
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
                  {order.paymentMethod}
                </p>
              </div>
            </ListGroupItem>
          </ListGroup>
          <ListGroup className="mt-2">
            <ListGroupItem>
              <h5>Order Items</h5>
              {order.orderItems.length === 0 ? (
                <AlertMessage heading="Oops!" variant="warning">
                  Your order is empty
                </AlertMessage>
              ) : (
                <ListGroup>
                  {order.orderItems.map((item, id) => (
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
          {/* {userInfo && userInfo.isAdmin && !order.isDelivered && (
            <ListGroup className="mt-2">
              <Button
                type="button"
                className="btn btn-block"
                onClick={successfulDelivery}
              >
                Mark Order As Delivered
              </Button>
            </ListGroup>
          )} */}
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
                <h1>£{order.totalPrice}</h1>
              </ListGroupItem>
              {!order.isPaid && (
                <ListGroupItem>
                  {loadingPay && <LoadSpinner />}
                  {!loaded ? (
                    <LoadSpinner />
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successfulPayment}
                    />
                  )}
                </ListGroupItem>
              )}
            </ListGroup>
          </Card>

          <ListGroupItem className="py-0 px-0">
            {order.isPaid ? (
              <AlertMessage heading="Payment status" variant="success">
                Paid on {order.paidAt.substring(0, 10)}
              </AlertMessage>
            ) : (
              <AlertMessage heading="Payment status" variant="warning">
                Not yet paid
              </AlertMessage>
            )}
          </ListGroupItem>
          <ListGroupItem className="py-0 px-0">
            {order.isDelivered ? (
              <AlertMessage heading="Delivery status" variant="success">
                Delivered on {order.deliveredAt.substring(0, 10)}
              </AlertMessage>
            ) : (
              <AlertMessage heading="Delivery status" variant="warning">
                Not yet delivered
              </AlertMessage>
            )}
          </ListGroupItem>
        </Col>
      </Row>
    </div>
  )
}

export default OrderPage
