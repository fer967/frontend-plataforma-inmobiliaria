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
import AdminIdecor from "./admin/AdminIdecor"
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
          <Route path="idecor" element={<AdminIdecor />} />
        </Route>
        <Route
          path="/privacy"
          element={
            <div style={{ padding: "20px" }}>
              <h1>Política de Privacidad</h1>
              <p>
                Esta aplicación es una plataforma de prueba para la gestión de propiedades inmobiliarias.
              </p>
              <p>
                No se recopilan datos personales sensibles. Los datos ingresados se utilizan únicamente
                para responder consultas.
              </p>
              <p>No se comparten datos con terceros.</p>
              <p>Contacto: gabrielfcorrea3@gmail.com</p>
            </div>
          }
        />

        <Route
          path="/data-deletion"
          element={
            <div style={{ padding: "20px" }}>
              <h1>Eliminación de Datos</h1>
              <p>
                Los usuarios pueden solicitar la eliminación de sus datos personales enviando un correo a:
              </p>
              <p>gabrielfcorrea3@gmail.com</p>
              <p>La eliminación se realizará en un plazo razonable.</p>
            </div>
          }
        />
      </Routes>
      <WhatsAppButton />
    </BrowserRouter>
  )
}

export default App






