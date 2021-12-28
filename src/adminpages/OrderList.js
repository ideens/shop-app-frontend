import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import AlertMessage from '../components/AlertMessage'
import LoadSpinner from '../components/LoadSpinner'
import { getOrders } from '../actions/orderActions'

const OrderList = () => {
  const dispatch = useDispatch()
  const orderList = useSelector((state) => state.orderList)
  const { loading, error, orders } = orderList

  useEffect(() => {
    dispatch(getOrders())
  }, [dispatch])

  return (
    <div>
      <h1>Orders</h1>
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
              <th>User</th>
              <th>Date</th>
              <th>Total Price</th>
              <th>Payment Status</th>
              <th>Delivery Status</th>
            </tr>
            <th></th>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>£{order.totalPrice}</td>
                <td>
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <i className="fas fa-times"></i>
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    order.deliveredAt.substring(0, 10)
                  ) : (
                    <i className="fas fa-times"></i>
                  )}
                </td>
                <td>
                  <LinkContainer
                    to={`/order/${order._id}`}
                    style={{ cursor: 'pointer', marginRight: '10px' }}
                  >
                    <Button className="btn-sm btn-secondary">Details</Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  )
}

export default OrderList
