import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Card,
  ListGroupItem,
} from 'react-bootstrap'
import AlertMessage from '../components/AlertMessage'
import { addToCart, removeFromCart } from '../actions/cartActions'
import { useParams } from 'react-router'

const Cart = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const queryParams = new URLSearchParams(document.location.search)
  const quantity = queryParams.get('quantity')

  const dispatch = useDispatch()

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, quantity))
    }
  }, [dispatch, id, quantity])

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  const removeItem = (id) => {
    dispatch(removeFromCart(id))
  }

  const handleCheckout = () => {
    navigate(`/login?redirect=shipping`)
  }

  return (
    <div>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <i className="fas fa-arrow-left"></i> Back
      </Link>
      <Row>
        <Col md={8}>
          <h1>Cart</h1>
          {cartItems.length == 0 ? (
            <AlertMessage heading="Oops!" variant="light">
              Your cart is empty
            </AlertMessage>
          ) : (
            <ListGroup>
              {cartItems.map((item) => (
                <ListGroupItem key={item.product} className="pb-1">
                  <Row className="mt-0 mb-1">
                    <Col md={2}>
                      <Image
                        src={`${process.env.REACT_APP_BASE_URL}${item.image}`}
                        alt={item.name}
                        fluid
                        rounded
                      />
                    </Col>
                    <Col md={3}>
                      <Link
                        to={`/product/${item.product}`}
                        style={{ textDecoration: 'none' }}
                      >
                        <h6>{item.name}</h6>
                      </Link>
                    </Col>
                    <Col md={3}>£{item.price}</Col>
                    <Col md={2}>
                      <Form.Control
                        as="select"
                        variant="outline-dark"
                        style={{
                          maxWidth: '45px',
                        }}
                        value={item.quantity}
                        onChange={(e) =>
                          dispatch(
                            addToCart(item.product, Number(e.target.value))
                          )
                        }
                        size="sm"
                      >
                        {[...Array(item.stockNum).keys()].map((num) => (
                          <option key={num + 1} value={num + 1}>
                            {num + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col md={1}>
                      <div
                        type="button"
                        onClick={() => removeItem(item.product)}
                      >
                        <i className="fas fa-trash"></i>
                      </div>
                    </Col>
                  </Row>
                  <hr className="mt-0 mb-0" style={{ color: 'white' }} />
                </ListGroupItem>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card className="card bg-light mb-3">
            <ListGroup>
              <ListGroupItem className="text-dark my-0">
                <h5>
                  <span style={{ fontSize: '1.8rem' }}>Cart total </span> (
                  {cartItems.reduce((acc, item) => acc + item.quantity, 0)}{' '}
                  items)
                </h5>
              </ListGroupItem>
              <ListGroupItem className="text-dark pt-0">
                <p style={{ fontSize: '1.5rem' }}>
                  £
                  {cartItems
                    .reduce((acc, item) => acc + item.quantity * item.price, 0)
                    .toFixed(2)}
                </p>
              </ListGroupItem>
              <ListGroupItem className="d-grid gap-2 pt-1">
                <button
                  type="button"
                  className="btn-dark"
                  onClick={handleCheckout}
                  disabled={cartItems.length === 0}
                  style={{
                    borderRadius: '8px',
                    height: '40px',
                  }}
                >
                  Go to Checkout
                </button>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Cart
