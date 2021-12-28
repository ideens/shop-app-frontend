import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  Form,
  Button,
  FormLabel,
  FormControl,
  FormGroup,
} from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { saveShippingAddress } from '../actions/cartActions'
import FormSteps from '../components/FormSteps'

const Shipping = () => {
  const navigate = useNavigate()
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  const dispatch = useDispatch()

  const [address, setAddress] = useState(shippingAddress.address)
  const [postcode, setPostcode] = useState(shippingAddress.postcode)
  const [city, setCity] = useState(shippingAddress.city)
  const [country, setCountry] = useState(shippingAddress.country)

  const formHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress({ address, postcode, city, country }))
    navigate(`/payment`)
  }

  return (
    <FormContainer>
      <FormSteps step1 step2 />
      <h1>Order details</h1>
      <h4>Shipping address:</h4>
      <Form onSubmit={formHandler}>
        <FormGroup controlId="address">
          <FormLabel className="mt-1">Address</FormLabel>
          <FormControl
            required
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></FormControl>
        </FormGroup>
        <FormGroup controlId="postcode">
          <FormLabel className="mt-1">Postcode</FormLabel>
          <FormControl
            required
            type="text"
            placeholder="Postcode"
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
          ></FormControl>
          <FormGroup controlId="city">
            <FormLabel className="mt-1">City</FormLabel>
            <FormControl
              required
              type="text"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            ></FormControl>
            <FormGroup controlId="country">
              <FormLabel className="mt-1">Country</FormLabel>
              <FormControl
                required
                type="text"
                placeholder="Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              ></FormControl>
            </FormGroup>
          </FormGroup>
        </FormGroup>
        <div className="d-grid gap-2">
          <Button type="submit" className="btn btn-dark btn-sm mt-2">
            Continue
          </Button>
        </div>
      </Form>
    </FormContainer>
  )
}

export default Shipping
