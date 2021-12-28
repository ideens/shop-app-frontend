import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  ListGroupItem,
  Form,
  FormGroup,
  FormLabel,
  FormControl,
} from 'react-bootstrap'
import {
  listProductDetail,
  createProductReview,
} from '../actions/productActions'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'
import { useParams } from 'react-router'
import LoadSpinner from '../components/LoadSpinner'
import AlertMessage from '../components/AlertMessage'
import Rating from '../components/Rating'

const ProductPage = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [quantity, setQuantity] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const dispatch = useDispatch()

  const productDetail = useSelector((state) => state.productDetail)
  const { loading, error, product } = productDetail

  const productCreateReview = useSelector((state) => state.productCreateReview)
  const {
    loading: loadingReview,
    error: errorReview,
    success: successReview,
  } = productCreateReview

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (successReview) {
      setRating(0)
      setComment('')
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
    }
    dispatch(listProductDetail(id))
  }, [dispatch, id, successReview])

  const addProductToCart = () => {
    navigate(`/cart/${id}?quantity=${quantity}`)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(createProductReview(id, { rating, comment }))
  }

  return (
    <div>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <i className="fas fa-arrow-left"></i> Back
      </Link>

      {loading ? (
        <LoadSpinner />
      ) : error ? (
        <AlertMessage heading="Error" variant="warning">
          {error}
        </AlertMessage>
      ) : (
        <div>
          <Row>
            <Col md={5}>
              <Image
                src={`${process.env.REACT_APP_BASE_URL}${product.image}`}
                alt={product.name}
                fluid
              />
            </Col>
            <Col>
              <div>
                <ListGroupItem className="pb-0">
                  <h4>{product.name}</h4>
                </ListGroupItem>
                <ListGroupItem className="py-0">
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                    color={'#f8e825'}
                  />
                </ListGroupItem>
                <ListGroupItem>
                  <h6>£{product.price}</h6>
                </ListGroupItem>
                <ListGroupItem className="py-0">
                  <p>{product.description}</p>
                </ListGroupItem>
              </div>
            </Col>
            <Col md={3}>
              <Card className="card bg-light mb-3">
                <ListGroup>
                  <ListGroupItem className="text-dark">
                    <Row>
                      <Col>Price:</Col>
                      <Col>£{product.price}</Col>
                    </Row>
                  </ListGroupItem>
                  <hr className="my-0" style={{ color: '#bac4d4' }} />
                  <ListGroupItem className="text-dark">
                    <Row>
                      {product.stockNum > 0 ? (
                        <Col className="text-success">In Stock</Col>
                      ) : (
                        <Col className="text-dark">Out of Stock</Col>
                      )}
                    </Row>
                  </ListGroupItem>
                  <hr className="my-0" style={{ color: '#bac4d4' }} />
                  {product.stockNum > 0 && (
                    <ListGroupItem className="text-dark">
                      <Row>
                        <Col>Quantity</Col>
                        <Col xs="auto">
                          <Form.Control
                            as="select"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            size="sm"
                          >
                            {[...Array(product.stockNum).keys()].map((num) => (
                              <option key={num + 1} value={num + 1}>
                                {num + 1}
                              </option>
                            ))}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroupItem>
                  )}
                  <ListGroupItem className="d-grid gap-2 pt-1">
                    <button
                      type="button"
                      className="btn-dark"
                      onClick={addProductToCart}
                      disabled={product.stockNum == 0}
                      style={{
                        borderRadius: '8px',
                      }}
                    >
                      Add to cart
                    </button>
                  </ListGroupItem>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mt-4">
              <h5>Write a review</h5>
              {loadingReview && <LoadSpinner />}
              {successReview && (
                <AlertMessage variant="success" heading="Thank you!">
                  Review submitted
                </AlertMessage>
              )}
              {errorReview && (
                <AlertMessage variant="danger" heading="Error">
                  {errorReview}
                </AlertMessage>
              )}
              {userInfo ? (
                <Form onSubmit={submitHandler}>
                  <FormGroup controlId="rating">
                    <FormLabel>
                      <strong>Rating</strong>
                    </FormLabel>
                    <FormControl
                      as="select"
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                      style={{ backgroundColor: 'rgba(17,78,119,0.3)' }}
                    >
                      <option value="">Select</option>
                      <option value="1">1 - Very Bad</option>
                      <option value="2">2 - Bad</option>
                      <option value="3">3 - Average</option>
                      <option value="4">4 - Good</option>
                      <option value="5">5 - Very Good</option>
                    </FormControl>
                  </FormGroup>
                  <FormGroup controlId="comment">
                    <FormLabel className="mt-2">
                      <strong>Comment</strong>
                    </FormLabel>
                    <FormControl
                      as="textarea"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    ></FormControl>
                  </FormGroup>
                  <button
                    type="submit"
                    className="btn-dark mt-2"
                    disabled={loadingReview}
                    style={{
                      borderRadius: '8px',
                      width: '100px',
                    }}
                  >
                    Submit
                  </button>
                </Form>
              ) : (
                <AlertMessage variant="info">
                  Please <Link to="/login">login</Link> to write a review
                </AlertMessage>
              )}
            </Col>
            <Col md={6} className="mt-4">
              <h5>Reviews</h5>
              {product.reviews.length == 0 && (
                <p style={{ color: '#b2b7bf' }}>No reviews yet</p>
              )}
              <div>
                {product.reviews.map((review) => (
                  <Card key={review._id} className="py-2 px-2 mb-2">
                    <p className="mb-0 pb-0">
                      <strong style={{ fontSize: '18px' }}>
                        {review.name}
                      </strong>
                      <span style={{ color: '#b2b7bf' }}>
                        {' '}
                        | {review.createdAt.substring(0, 10)}
                      </span>
                    </p>
                    <Rating value={review.rating} color={'#f8e825'} />
                    <p className="mb-0">{review.comment}</p>
                  </Card>
                ))}
              </div>
            </Col>
          </Row>
        </div>
      )}
    </div>
  )
}

export default ProductPage
