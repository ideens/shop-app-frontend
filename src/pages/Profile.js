// import { useState, useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
// import { Table, Button, Row, Col } from 'react-bootstrap'
// import { LinkContainer } from 'react-router-bootstrap'
// import AlertMessage from '../components/AlertMessage'
// import LoadSpinner from '../components/LoadSpinner'
// import { getUserDetails, updateUserProfile } from '../actions/userActions'
// import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'
// import { getMyOrders } from '../actions/orderActions'

const Profile = () => {
  // const navigate = useNavigate()
  // const [name, setName] = useState('')
  // const [email, setEmail] = useState('')
  // const [password, setPassword] = useState('')
  // const [passwordConf, setPasswordConf] = useState('')
  // const [message, setMessage] = useState('')

  // const dispatch = useDispatch()

  // const userDetail = useSelector((state) => state.userDetail)
  // const { loading, error, user } = userDetail

  // const userLogin = useSelector((state) => state.userLogin)
  // const { userInfo } = userLogin

  // const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  // const { success } = userUpdateProfile

  // const orderMyList = useSelector((state) => state.orderMyList)
  // const { loading: loadingOrders, error: errorOrders, orders } = orderMyList

  // useEffect(() => {
  //   if (!userInfo) {
  //     navigate('/login')
  //   } else {
  //     if (!user || !user.name || success) {
  //       dispatch({ type: USER_UPDATE_PROFILE_RESET })
  //       dispatch(getUserDetails('profile'))
  //       dispatch(getMyOrders())
  //     } else {
  //       setName(user.name)
  //       setEmail(user.email)
  //     }
  //   }
  // }, [dispatch, navigate, userInfo, user, success])

  return
  // (
  //   <Row>
  //     <Col md={9}>
  //       <h2>Order History</h2>
  //       {loadingOrders ? (
  //         <LoadSpinner />
  //       ) : errorOrders ? (
  //         <AlertMessage heading="Error" variant="danger">
  //           {errorOrders}
  //         </AlertMessage>
  //       ) : (
  //         <Table className="table-sm table-striped table-hover">
  //           <thead>
  //             <tr>
  //               <th>ID</th>
  //               <th>Date</th>
  //               <th>Total Cost</th>
  //               <th>Paid</th>
  //               <th>Status</th>
  //             </tr>
  //           </thead>

  //           <tbody>
  //             {orders.map((order) => (
  //               <tr key={order._id}>
  //                 <td>{order._id}</td>
  //                 <td>{order.createdAt.substring(0, 10)}</td>
  //                 <td>£{order.totalPrice}</td>
  //                 <td>
  //                   {order.isPaid ? order.paidAt.substring(0, 10) : <p>-</p>}
  //                 </td>
  //                 <td>
  //                   <LinkContainer to={`/order/${order._id}`}>
  //                     <Button
  //                       type="submit"
  //                       className="btn btn-dark btn-sm mt-0"
  //                     >
  //                       Details
  //                     </Button>
  //                   </LinkContainer>
  //                 </td>
  //               </tr>
  //             ))}
  //           </tbody>
  //         </Table>
  //       )}
  //     </Col>
  //   </Row>
  // )
}

export default Profile
