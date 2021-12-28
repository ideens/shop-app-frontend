import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import {
  Form,
  Button,
  Row,
  Col,
  FormGroup,
  FormLabel,
  FormControl,
} from 'react-bootstrap'
import AlertMessage from '../components/AlertMessage'
import LoadSpinner from '../components/LoadSpinner'
import { login } from '../actions/userActions'
import FormContainer from '../components/FormContainer'

const LoginPage = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const url = new URLSearchParams(document.location.search)
  const redirect = url.has('redirect') ? url.get('redirect') : '/'

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  useEffect(() => {
    if (userInfo) {
      navigate(`${redirect}`)
    }
  }, [navigate, redirect, userInfo])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }

  return (
    <FormContainer>
      <h2>Log in</h2>
      {error && (
        <AlertMessage heading="Error" variant="danger">
          Please enter correct details
        </AlertMessage>
      )}
      {loading && <LoadSpinner />}
      <Form onSubmit={submitHandler}>
        <FormGroup controlId="email">
          <FormLabel className="mt-2">Email</FormLabel>
          <FormControl
            type="email"
            placeholder="example@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></FormControl>
        </FormGroup>
        <FormGroup controlId="password">
          <FormLabel className="mt-2">Password</FormLabel>
          <FormControl
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></FormControl>
        </FormGroup>
        <div className="d-grid gap-2">
          <Button type="submit" className="btn btn-dark btn-sm mt-2">
            Log in
          </Button>
        </div>
      </Form>
      <Row className="py-3">
        <Col>
          New here?{' '}
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default LoginPage
