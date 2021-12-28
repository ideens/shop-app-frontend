import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { Table, Button } from 'react-bootstrap'
import AlertMessage from '../components/AlertMessage'
import LoadSpinner from '../components/LoadSpinner'
import { getUserList, deleteUser } from '../actions/userActions'

const UserList = () => {
  const dispatch = useDispatch()
  const userList = useSelector((state) => state.userList)
  const { loading, error, users } = userList

  const userDelete = useSelector((state) => state.userDelete)
  const { success: successDelete } = userDelete

  useEffect(() => {
    dispatch(getUserList())
  }, [dispatch, successDelete])

  const handleDelete = (id) => {
    if (window.confirm('Delete user?')) {
      dispatch(deleteUser(id))
    }
  }

  return (
    <div>
      <h1>Users</h1>
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
              <th>Email</th>
              <th>Admin</th>
            </tr>
            <th></th>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.isAdmin ? (
                    <i className="fas fa-check"></i>
                  ) : (
                    <i className="fas fa-times"></i>
                  )}
                </td>
                <td>
                  <Button
                    className="btn-sm btn-secondary"
                    onClick={() => handleDelete(user.id)}
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

export default UserList
