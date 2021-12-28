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
import { register } from '../actions/userActions'
import FormContainer from '../components/FormContainer'

const RegisterPage = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConf, setPasswordConf] = useState('')
  const [message, setMessage] = useState('')

  const dispatch = useDispatch()

  const url = new URLSearchParams(document.location.search)
  const redirect = url.has('redirect') ? url.get('redirect') : '/'

  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error, userInfo } = userRegister

  useEffect(() => {
    if (userInfo) {
      navigate(`${redirect}`)
    }
  }, [navigate, redirect, userInfo])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== passwordConf) {
      setMessage('Passwords do not match')
    } else {
      dispatch(register(name, email, password))
    }
  }

  return (
    <FormContainer>
      <h2>Register</h2>
      {message && (
        <AlertMessage heading="Oops!" variant="danger">
          {message}
        </AlertMessage>
      )}
      {error && (
        <AlertMessage heading="Error" variant="danger">
          {error}
        </AlertMessage>
      )}
      {loading && <LoadSpinner />}
      <Form onSubmit={submitHandler}>
        <FormGroup controlId="name">
          <FormLabel className="mt-1">Name</FormLabel>
          <FormControl
            required
            type="name"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></FormControl>
        </FormGroup>
        <FormGroup controlId="email">
          <FormLabel className="mt-2">Email</FormLabel>
          <FormControl
            required
            type="email"
            placeholder="example@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></FormControl>
        </FormGroup>
        <FormGroup controlId="password">
          <FormLabel className="mt-2">Password</FormLabel>
          <FormControl
            required
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></FormControl>
        </FormGroup>
        <FormGroup controlId="passwordConf">
          <FormLabel className="mt-2">Confirm password</FormLabel>
          <FormControl
            required
            type="password"
            placeholder="password"
            value={passwordConf}
            onChange={(e) => setPasswordConf(e.target.value)}
          ></FormControl>
        </FormGroup>
        <div className="d-grid gap-2">
          <Button type="submit" className="btn btn-dark btn-sm mt-2">
            Register
          </Button>
        </div>
      </Form>
      <Row className="py-3">
        <Col>
          Already registered?{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
            Log in
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default RegisterPage
