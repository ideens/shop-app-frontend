import { useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product.js'
import LoadSpinner from '../components/LoadSpinner.js'
import AlertMessage from '../components/AlertMessage.js'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'

const Home = () => {
  const dispatch = useDispatch()
  const productList = useSelector((state) => state.productList)
  // using useSelector to tell it what part of the state we want to get
  const { error, loading, products } = productList

  useEffect(() => {
    dispatch(listProducts())
    // updates store
  }, [dispatch])

  return (
    <div>
      <h1>Latest Art</h1>
      {loading ? (
        <LoadSpinner />
      ) : error ? (
        <AlertMessage heading="Error" variant="warning">
          {error}
        </AlertMessage>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  )
}

export default Home
