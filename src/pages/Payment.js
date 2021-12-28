import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { savePaymentMethod } from '../actions/cartActions'
import {
  Form,
  Button,
  FormLabel,
  FormGroup,
  Col,
  Row,
  FormCheck,
} from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import FormSteps from '../components/FormSteps'

const Payment = () => {
  const navigate = useNavigate()
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  const dispatch = useDispatch()

  const [paymentMethod, setPaymentMethod] = useState('PayPal')

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    navigate(`/confirmorder`)
  }

  return (
    <FormContainer>
      <FormSteps step1 step2 step3 />
      <h1>Order details</h1>
      <h4>Payment details</h4>
      <Form onSubmit={submitHandler}>
        <FormGroup>
          <FormLabel className="mt-2" as="legend">
            <p style={{ fontSize: '16px' }}>Select a payment method</p>
          </FormLabel>
          <Col>
            <Row>
              <div className="d-flex flex-row align-items-center gap-2">
                <FormCheck
                  type="radio"
                  label="PayPal"
                  id="PayPal"
                  name="payment"
                  checked
                  onChange={(e) => setPaymentMethod(e.target.value)}
                ></FormCheck>
                <i className="fab fa-paypal"></i>
              </div>
            </Row>
            <Row>
              <div className="d-flex flex-row align-items-center gap-2">
                <FormCheck
                  disabled
                  type="radio"
                  label="Visa Debit"
                  id="VisaDebit"
                  name="payment"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                ></FormCheck>
                <i className="fab fa-cc-visa"></i>
              </div>
            </Row>
            <Row>
              <div className="d-flex flex-row align-items-center gap-2">
                <FormCheck
                  disabled
                  type="radio"
                  label="ApplePay"
                  id="Apple Pay"
                  name="payment"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                ></FormCheck>
                <i className="fab fa-cc-apple-pay"></i>
              </div>
            </Row>
          </Col>
        </FormGroup>
        <div className="d-grid gap-2">
          <Button type="submit" className="btn btn-dark btn-sm mt-3">
            Continue
          </Button>
        </div>
      </Form>
    </FormContainer>
  )
}

export default Payment
