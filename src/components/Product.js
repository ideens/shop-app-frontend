import React from 'react'
import { Card } from 'react-bootstrap'
import Rating from './Rating'
import { Link } from 'react-router-dom'

const Product = ({ product }) => {
  return (
    <Link to={`/product/${product._id}`} style={{ textDecoration: 'none' }}>
      <Card className="card border-light mb-3">
        <Card.Header>{product.name}</Card.Header>
        <Card.Img src={`${process.env.REACT_APP_BASE_URL}${product.image}`} />
        <Card.Body>
          <Card.Text>
            <div>
              <Rating
                value={product.rating}
                text={` ${product.numReviews} reviews`}
                color={`#f8e825`}
              />
            </div>
          </Card.Text>
          <Card.Text>{`£${product.price}`}</Card.Text>
        </Card.Body>
      </Card>
    </Link>
  )
}

export default Product
