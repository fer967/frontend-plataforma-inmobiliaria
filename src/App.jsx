import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Ventas from "./pages/Ventas"
import Alquiler from "./pages/Alquiler"
import Contacto from "./pages/Contacto"
import Login from "./pages/Login"
import Tasaciones from "./pages/Tasaciones"
import PropertyDetail from "./pages/PropertyDetail"
import WhatsAppButton from "./components/WhatsAppButton"
import AdminLayout from "./admin/AdminLayout"
import AdminDashboard from "./admin/AdminDashboard"
import AdminProperties from "./admin/AdminProperties"
import AdminLeads from "./admin/AdminLeads"
import { useContext } from "react"
import { AuthContext } from "./context/AuthContext"
import { Navigate } from "react-router-dom"

function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext)
  if (!user) {
    return <Navigate to="/login" />
  }
  return children
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ventas" element={<Ventas />} />
        <Route path="/alquiler" element={<Alquiler />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/login" element={<Login />} />
        <Route path="/tasaciones" element={<Tasaciones />} />
        <Route path="/property/:id" element={<PropertyDetail />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="properties" element={<AdminProperties />} />
          <Route path="leads" element={<AdminLeads />} />
        </Route>
      </Routes>
      <WhatsAppButton />
    </BrowserRouter>
  )
}

export default App






