import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { useNavigate } from 'react-router-dom'
import { Table, Button, Row, Col } from 'react-bootstrap'
import AlertMessage from '../components/AlertMessage'
import LoadSpinner from '../components/LoadSpinner'
import {
  listProducts,
  deleteProduct,
  createProduct,
} from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'

const ProductList = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const productList = useSelector((state) => state.productList)
  const { loading, error, products } = productList

  const productDelete = useSelector((state) => state.productDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete

  const productCreate = useSelector((state) => state.productCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET })

    if (successCreate) {
      navigate(`/admin/product/${createdProduct._id}/edit`)
    } else {
      dispatch(listProducts())
    }
  }, [dispatch, successDelete, successCreate, createdProduct])

  const handleDelete = (id) => {
    if (window.confirm('Delete product?')) {
      dispatch(deleteProduct(id))
    }
  }

  const handleCreateProduct = (product) => {
    dispatch(createProduct())
  }

  return (
    <div>
      <Row>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col
          style={{ display: 'flex', justifyContent: 'flex-end' }}
          className="text-right"
        >
          <Button
            className="btn-sm btn-secondary"
            onClick={handleCreateProduct}
            style={{ height: '35px', marginTop: '10px' }}
          >
            <i className="fas fa-plus"> </i> Add Product
          </Button>
        </Col>
      </Row>
      {loadingDelete && <LoadSpinner />}
      {errorDelete && (
        <AlertMessage variant="danger" heading="Error">
          {errorDelete}
        </AlertMessage>
      )}

      {loadingCreate && <LoadSpinner />}
      {errorCreate && (
        <AlertMessage variant="danger" heading="Error">
          {errorCreate}
        </AlertMessage>
      )}

      {loading ? (
        <LoadSpinner />
      ) : error ? (
        <AlertMessage variant="danger" heading="Error">
          {error}
        </AlertMessage>
      ) : (
        <Table className="table-sm table-striped table-hover table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
            </tr>
            <th></th>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>£{product.price}</td>
                <td>{product.stockNum}</td>
                <td>
                  <LinkContainer
                    to={`/admin/product/${product._id}/edit`}
                    style={{ cursor: 'pointer', marginRight: '10px' }}
                  >
                    <Button className="btn-sm btn-secondary">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    className="btn-sm btn-secondary"
                    onClick={() => handleDelete(product._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  )
}

export default ProductList
