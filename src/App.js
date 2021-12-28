import Footer from './components/Footer'
import Header from './components/Header'
import { Container } from 'react-bootstrap'
import { Routes, Route } from 'react-router-dom'
import Cart from './pages/Cart.js'

import Home from './pages/Home'
import ProductPage from './pages/ProductPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import Profile from './pages/Profile'
import Shipping from './pages/Shipping'
import Payment from './pages/Payment'
import ConfirmOrder from './pages/ConfirmOrder'
import OrderPage from './pages/OrderPage'
import UserList from './adminpages/UserList'
import ProductList from './adminpages/ProductList'
import ProductEdit from './adminpages/ProductEdit'
import OrderList from './adminpages/OrderList'

function App() {
  return (
    <div className="body">
      <Header />
      <Container className="py-3">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/product/:id" element={<ProductPage />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route path="/cart/:id/*" element={<Cart />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile/" element={<Profile />} />
          <Route path="/login/shipping" element={<Shipping />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/confirmorder" element={<ConfirmOrder />} />
          <Route path="/order/:id" element={<OrderPage />} />
          <Route path="/admin/userlist" element={<UserList />} />
          <Route path="/admin/productlist" element={<ProductList />} />
          <Route path="/admin/product/:id/edit" element={<ProductEdit />} />
          <Route path="/admin/orderlist" element={<OrderList />} />
        </Routes>
      </Container>
    </div>
  )
}

export default App
