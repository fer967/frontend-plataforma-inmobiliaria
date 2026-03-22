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

                <div className="flex gap-2 text-sm">
                    <Link to="/admin">Dashboard</Link>
                    <Link to="/admin/leads">Leads</Link>
                    {/* <Link to="/admin/properties">Props</Link> */}
                </div>
            </header>

            {/* 📌 SIDEBAR DESKTOP */}
            <aside className="hidden md:flex md:flex-col w-64 bg-gray-900 text-white p-4">

                <h2 className="text-xl font-bold mb-6">Admin</h2>

                <nav className="flex flex-col gap-2">
                    <Link to="/admin" className="hover:bg-gray-700 p-2 rounded">
                        Dashboard
                    </Link>
                    <Link to="/admin/leads" className="hover:bg-gray-700 p-2 rounded">
                        Leads
                    </Link>
                    {/* <Link to="/admin/properties" className="hover:bg-gray-700 p-2 rounded">
                        Propiedades
                    </Link> */}
                </nav>

                <button
                    onClick={logout}
                    className="mt-auto bg-red-600 p-2 rounded"
                >
                    Cerrar sesión
                </button>

            </aside>

            {/* CONTENT */}
            <main className="flex-1 p-4 md:p-8">
                <Outlet />
            </main>

        </div>
    )
}

export default AdminLayout


// import { Outlet, Link } from "react-router-dom"
// import { useContext } from "react"
// import { AuthContext } from "../context/AuthContext"

// function AdminLayout() {

//     const { logout } = useContext(AuthContext)

//     return (
//         <div className="flex">

//             {/* Sidebar */}
//             <aside className="w-64 bg-gray-900 text-white min-h-screen p-4">
//                 {/* <h2 className="text-xl font-bold mb-4">Admin</h2> */}

//                 <nav className="flex flex-col space-y-2">
//                     <Link to="/admin" className="hover:bg-gray-700 p-2 rounded">
//                         Dashboard
//                     </Link>
//                     <Link to="/admin/leads" className="hover:bg-gray-700 p-2 rounded">
//                         Leads
//                     </Link>
//                     {/* <Link to="/admin/properties" className="hover:bg-gray-700 p-2 rounded">
//                         Propiedades
//                     </Link> */}
//                 </nav>
//                 <br />
//                 <button onClick={logout}>Cerrar sesión</button>
//             </aside>

//             {/* Content */}
//             <main className="flex-1 p-4 md:p-8">
//                 <Outlet />
//             </main>

//         </div>
//     )
// }

// export default AdminLayout


// import AdminSidebar from "./AdminSidebar"

// function AdminLayout({ children }) {

//     return (
//         <div className="flex">
//             <AdminSidebar />
//             <main className="flex-1 p-6 bg-gray-100 min-h-screen">
//                 {children}
//             </main>
//         </div>
//     )
// }

// export default AdminLayout