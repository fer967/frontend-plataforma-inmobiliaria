import { Outlet, Link } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"

function AdminLayout() {

    const { logout } = useContext(AuthContext)

    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            {/* 🔝 TOPBAR MOBILE */}
            <header className="md:hidden bg-gray-900 text-white p-4 flex justify-between items-center">
                <h2 className="font-bold">Admin</h2>
                <div className="flex items-center gap-3 text-sm">
                    <Link to="/admin">Dashboard</Link>
                    <Link to="/admin/leads">Leads</Link>
                </div>
                <button
                    onClick={logout}
                    className="bg-red-600 px-2 py-1 rounded text-xs"
                >
                    Salir
                </button>
            </header>
            {/* 📌 SIDEBAR DESKTOP */}
            <aside className="hidden md:flex md:flex-col w-64 bg-gray-900 text-white p-4">
                <h2 className="text-xl font-bold mb-6">Admin</h2>
                <nav className="flex flex-col gap-2">
                    <Link to="/admin" className="hover:bg-gray-700 p-2 rounded">
                        Propiedades
                    </Link>
                    <Link to="/admin/leads" className="hover:bg-gray-700 p-2 rounded">
                        Consultas
                    </Link>
                    <button
                        onClick={logout}
                        className="mt-auto bg-red-600 p-2 rounded"
                    >
                        Cerrar sesión
                    </button>
                </nav>
            </aside>
            {/* CONTENT */}
            <main className="flex-1 p-4 md:p-8">
                <Outlet />
            </main>
        </div>
    )
}

export default AdminLayout


