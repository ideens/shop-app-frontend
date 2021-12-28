import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import LoadSpinner from '../components/LoadSpinner.js'
import AlertMessage from '../components/AlertMessage.js'
import FormContainer from '../components/FormContainer'
import { listProductDetail, updateProduct } from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants.js'
import { useParams } from 'react-router'
import { useNavigate } from 'react-router'

const ProductEdit = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [stockNum, setStockNum] = useState(0)
  const [description, setDescription] = useState('')
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const productDetail = useSelector((state) => state.productDetail)
  const { product, error, loading } = productDetail

  const productUpdate = useSelector((state) => state.productUpdate)
  const {
    success: successUpdate,
    error: errorUpdate,
    loading: loadingUpdate,
  } = productUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET })
      navigate(`/admin/productlist`)
    } else {
      if (!product.name || product._id !== Number(id)) {
        dispatch(listProductDetail(id))
      } else {
        setName(product.name)
        setPrice(product.price)
        setImage(product.image)
        setStockNum(product.stockNum)
        setDescription(product.description)
      }
    }
  }, [product, id, dispatch, successUpdate, navigate])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateProduct({
        _id: id,
        name,
        price,
        image,
        description,
        stockNum,
      })
    )
  }

  const uploadImageHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()

    formData.append('image', file)
    formData.append('product_id', id)

    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post(
        '/api/products/upload/',
        formData,
        config
      )
      setImage(data)
      setUploading(false)
    } catch (error) {
      setUploading(false)
    }
  }

  return (
    <div>
      <Link to="/admin/productlist" style={{ textDecoration: 'none' }}>
        <i className="fas fa-arrow-left"></i> Back
      </Link>

      <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <LoadSpinner />}
        {errorUpdate && (
          <AlertMessage variant="danger" heading="Error">
            {errorUpdate}
          </AlertMessage>
        )}

        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label className="mt-2">Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Product name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="price">
            <Form.Label className="mt-2">Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Product price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="image">
            <Form.Label className="mt-2">Image</Form.Label>
            <Form.Control
              type="text"
              placeholder="Product image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="formFile">
            <Form.Label className="mt-2">Upload</Form.Label>
            <Form.Control type="file" onChange={uploadImageHandler} />
          </Form.Group>

          <Form.Group controlId="stockNum">
            <Form.Label className="mt-2">Quantity in stock</Form.Label>
            <Form.Control
              type="number"
              placeholder="Quantity"
              value={stockNum}
              onChange={(e) => setStockNum(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="description">
            <Form.Label className="mt-2">Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></Form.Control>
            {uploading && <LoadSpinner />}
          </Form.Group>

          <div className="d-grid gap-2">
            <Button type="submit" className="btn btn-dark btn-sm mt-2">
              Update
            </Button>
          </div>
        </Form>
      </FormContainer>
    </div>
  )
}

export default ProductEdit
