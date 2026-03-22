import { Link } from "react-router-dom"

function AdminSidebar() {
    return (

        <div className="w-64 bg-gray-900 text-white min-h-screen p-4">

            <h2 className="text-xl font-bold mb-6">
                Panel Admin
            </h2>

            <nav className="flex flex-col space-y-4">

                <Link to="/admin" className="hover:text-green-400">
                    Propiedades
                </Link>

                {/* <Link to="/admin/properties" className="hover:text-green-400">
                    Propiedades
                </Link> */}

                <Link to="/admin/leads" className="hover:text-green-400">
                    Leads
                </Link>

            </nav>

        </div>

    )
}

export default AdminSidebar