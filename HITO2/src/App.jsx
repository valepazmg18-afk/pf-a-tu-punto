
import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import AdminLayout from './layouts/AdminLayout'
import ProtectedRoute from './components/ProtectedRoute'

import Home from './pages/home'
import Login from './pages/login'
import Register from './pages/register'
import Gallery from './pages/gallery'
import ProductDetail from './pages/productDetail'
import Profile from './pages/profile'
import Cart from './pages/cart'
import AdminDashboard from './pages/adminDashboard'
import ManageProducts from './pages/manageProducts'

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/galeria" element={<Gallery />} />
        <Route path="/producto/:id" element={<ProductDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/perfil" element={<Profile />} />
        <Route path="/carrito" element={<Cart />} />
      </Route>

      {/* Rutas protegidas de administración */}
      <Route element={<ProtectedRoute requiredRole="admin" />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/productos" element={<ManageProducts />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
